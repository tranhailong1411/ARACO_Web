import { fileLoader } from "ejs";
import db from "../models/index";
import { ROWLOCK } from "sequelize/lib/table-hints";
import Position from "../models/Position";
import Koutei from "../models/Koutei";
const fs = require("fs");
const csv = require("csv-parser");
const iconv = require("iconv-lite");
const path = require("path");
let processedFiles = {};
let postAllCSVData = async (req, res) => {
  try {
    const csvDirectory = "./src/csv/";
    const files = fs.readdirSync(csvDirectory);
    await insertAllDataFromCSVFiles(files, csvDirectory, 0);
    return res.send("All CSV data inserted into database");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error inserting CSV data");
  }
};
let insertAllDataFromCSVFiles = async (files, directoryPath, currentIndex) => {
  if (currentIndex >= files.length) {
    return; // Finished processing all files
  }

  const filePath = path.join(directoryPath, files[currentIndex]);
  await insertDataFromCSV(filePath);

  // Process next file
  await insertAllDataFromCSVFiles(files, directoryPath, currentIndex + 1);
};
const insertDataFromCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    if (processedFiles[filePath]) {
      console.log(`File ${filePath} has already been processed. Skipping...`);
      resolve();
      return;
    }
    let isFirstLine = true;
    let rowCount = 1;
    let locationID;
    let position;
    let shift;
    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream("Shift_JIS"))
      .pipe(csv({ headers: false }))
      .on("data", async (row) => {
        if (isFirstLine) {
          isFirstLine = false; //
          return;
        }
        try {
          rowCount++;

          if (rowCount == 3) {
            if (row[1].slice(0, 3) === "3rd") {
              locationID = "サード";
              position = row[1].slice(3);
            } else {
              locationID = "フロント";
              position = row[1];
            }
          }
          if (rowCount == 14) {
            let parts = row[0].split(" ");
            let datePart = parts[0];
            let timePart = parts[1];
            let dateObj = new Date(datePart);
            let formattedDate = `${dateObj.getFullYear()}/${
              dateObj.getMonth() + 1
            }/${dateObj.getDate()}`;
            let hour = parseInt(timePart.split(":")[0]);
            if (hour >= 1 && hour <= 15) {
              shift = "前直";
            } else if (hour >= 17 && hour <= 24) {
              shift = "後直";
            }
            let delays = [];
            for (let i = 31; i <= 60; i++) {
              let minuteDelay = parseFloat(row[i]);
              let secondDelay = parseFloat(row[i + 30]);
              if (!isNaN(minuteDelay) && !isNaN(secondDelay)) {
                delays.push(minuteDelay * 60 + secondDelay);
              }
            }
            for (let i = 0; i < delays.length; i++) {
              await db.FullTable.create({
                Location: locationID,
                Date: formattedDate,
                Shift: shift,
                Position: position,
                Koutei: i + 1,
                DelayTime: delays[i],
                DelayCount: row[i + 1],
              });
            }
          }
        } catch (error) {
          console.error("Error inserting record:", error);
        }
      })
      .on("end", () => {
        processedFiles[filePath] = true;
        console.log("CSV file processed");
        resolve(); // Resolve the promise when processing is complete
      })
      .on("error", (err) => {
        reject(err); // Reject the promise if there is an error
      });
  });
};

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

let getAboutPage = async (req, res) => {
  try {
    let data1 = await db.FullTable.findAll();
    return res.render("Page1.ejs", { data1: JSON.stringify(data1) });
  } catch (error) {
    console.log(error);
  }
};

let getCRUD = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("Page2.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};
let getData = async (req, res) => {
  try {
    let data = await db.FullTable.findAll({
      where: {
        Date: "2024-03-01",
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi khi lấy dữ liệu");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postAllCSVData: postAllCSVData,
  getData: getData,
};

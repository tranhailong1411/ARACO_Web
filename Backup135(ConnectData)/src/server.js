import express from "express";

import bodyParser from "body-parser";

import viewEngine from "./config/viewEngine";
import { connectDB } from "./config/connectDB";
import initWebRoutes from "./route/web";
require("dotenv").config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();
let port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("Server is running on port:" + port);
});

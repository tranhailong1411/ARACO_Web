import express, { Router } from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let route = express.Router();

let initWebRoutes = (app) => {
  route.get("/", homeController.getHomePage);
  route.get("/about", homeController.getAboutPage);
  route.get("/crud", homeController.getCRUD);
  route.post("/update-data", homeController.postAllCSVData);
  route.get("/api/data", homeController.getData);
  route.post("/api/login", userController.handleLogin);
  return app.use("/", route);
};

module.exports = initWebRoutes;

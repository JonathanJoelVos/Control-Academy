import express from "express";
import AdminController from "../controller/adminController.js";

const routes = express.Router();

routes
    .post("/actions/create", AdminController.createAction)
    .patch("/action/update/:id", AdminController.addMethodInActions)


export default routes;
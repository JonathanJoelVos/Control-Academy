import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();

routes
    .get("/actions", AdminController.listActions)
    .post("/actions/create", AdminController.createAction)
    .put("/actions/update/:id", AdminController.updateActions)
    .patch("/actions/methods", AdminController.addMethodInActions)
    .delete("/actions/delete/:id", AdminController.deleteActions)
    .delete("/actions/methods/delete", AdminController.deleteMethodInActions)

export default routes;
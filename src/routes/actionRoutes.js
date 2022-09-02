import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();
const controll = AdminController.actionControll;

routes
    .get("/actions", controll.readActions)
    .get("/actions/:id", controll.readActionsById)
    .post("/actions/create", controll.createAction)
    .put("/actions/update/:id", controll.updateActions)
    .patch("/actions/methods", controll.addMethodInActions)
    .delete("/actions/delete/:id", controll.deleteActions)
    .delete("/actions/methods/delete", controll.deleteMethodInActions)

export default routes;
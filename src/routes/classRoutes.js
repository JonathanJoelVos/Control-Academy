import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();
const controll = AdminController.classControll

routes
    .get("/classes", controll.readClasses)
    .get("/classes/:id", controll.readClassesById)
    .post("/classes/create", controll.createClass)
    .delete("/classes/delete/:id", controll.deleteClass)
    .put("/classes/update/:id", controll.updateClass)

export default routes;
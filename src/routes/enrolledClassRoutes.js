import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();
const controll = AdminController.enrolledControll;
routes
    .get("/enrolled", controll.readEnrolled)
    .post("/enrolled/create", controll.createEnrolled)
    .put("/enrolled/update/:id", controll.updateEnrolled)
    .delete("/enrolled/delete/:id", controll.deleteEnrolled)

export default routes;
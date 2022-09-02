import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();
const controll = AdminController.disciplineControll;

routes
    .get("/disciplines", controll.readDisciplenes)
    .post("/disciplines/create", controll.createDiscipline)
    .put("/disciplines/update/:id", controll.updateDiscipline)
    .delete("/disciplines/delete/:id", controll.deleteDiscipline)

export default routes;
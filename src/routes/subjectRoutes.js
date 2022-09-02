import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();
const controll = AdminController.subjectControll;

routes
    .get("/subjects", controll.readSubject)
    .get("/subjects/:id", controll.readSubjectById)
    .post("/subjects/create", controll.createSubject)
    .put("/subjects/update/:id", controll.updateSubject)
    .delete("/subjects/delete/:id", controll.deleteSubject)

export default routes;  
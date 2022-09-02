import express from "express";
import StudentController from "../controller/users/studentController.js";
const routes = express.Router();
const controll = StudentController;

routes
    .get("/student/:id", controll.viewAllFinalGradeAndFrequency)
    .get("/student/notes/:id", controll.viewFinalGradeAndFrequency)

export default routes;
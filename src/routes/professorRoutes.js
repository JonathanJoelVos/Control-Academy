import express from "express";
import ProfessorController from "../controller/users/professorController.js";
const routes = express.Router();
const controll = ProfessorController;

routes
    .put("/professor/:id", controll.giveGradeAndFrequency)


export default routes;
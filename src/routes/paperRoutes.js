import express from "express";
import AdminController from "../controller/adminController.js";

const routes = express.Router();

routes
    .get("/paper/list", AdminController.listPapers)
    .post("/paper/create", AdminController.createPaper)
    .patch("/paper/update/:id", AdminController.addActionsInPapers)


export default routes;
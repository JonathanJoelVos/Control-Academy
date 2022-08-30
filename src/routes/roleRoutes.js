import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();

routes
    .get("/roles", AdminController.listRoles)
    .post("/roles/create", AdminController.createRole)
    .put("/roles/update/:id", AdminController.updateRoles)
    .delete("/roles/delete/:id", AdminController.deleteRoles)

export default routes;
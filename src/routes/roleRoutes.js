import express from "express";
import AdminController from "../controller/users/adminController.js";

const routes = express.Router();
const controll = AdminController.roleControll;

routes
    .get("/roles", controll.listRoles)
    .post("/roles/create", controll.createRole)
    /* .put("/roles/update/:id", controll.updateRoles) não deixa editar para evitar problema*/
    .patch("/roles/actions/:id", controll.addActionsInRoles)
    .delete("/roles/delete/:id", controll.deleteRoles)
    .delete("/roles/actions/delete/:id", controll.deleteActionsInRoles)


export default routes;
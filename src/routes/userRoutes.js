import express from 'express';
import AdminController from '../controller/users/adminController.js';

const routes = express.Router();
const controll = AdminController.userControll;

routes
    .get("/users", controll.readUser)
    .post("/users/create", controll.createUser)
    .put("/users/update/:id", controll.updateUser)
    .delete("/users/delete/:id", controll.deleteUser)


export default routes;
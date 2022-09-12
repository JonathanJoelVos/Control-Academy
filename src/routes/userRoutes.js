import express from 'express';
import auth from '../controller/management/authController.js';
import AdminController from '../controller/users/adminController.js';

const routes = express.Router();
const controll = AdminController.userControll;

routes
    .get("/users", controll.readUser)
    .get("/users/:id", controll.readUsersById)
    .get("/users/logout", auth, controll.logoutUser)
    .post("/users/create", controll.createUser)
    .put("/users/update/:id", controll.updateUser)
    .delete("/users/delete/:id", controll.deleteUser)
    .post("/users/login", controll.loginUser)

export default routes;
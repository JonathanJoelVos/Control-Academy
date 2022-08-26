import UserController from "../controller/userController.js";
import express from 'express';

const routes = express.Router();

routes
    .post('/users/create', UserController.createUser)
    .post('/users/login', UserController.loginUser)


export default routes;
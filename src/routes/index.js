import express from "express";
import users from "../routes/userRoutes.js";
import papers from "../routes/paperRoutes.js";
import actions from "../routes/actionRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.send("vamooooo");
    })

    app.use(
        express.json(),
        users,
        papers,
        actions
    )
}

export default routes;
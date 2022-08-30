import express from "express";
import users from "../routes/userRoutes.js";
import roles from "../routes/roleRoutes.js";
import actions from "../routes/actionRoutes.js";
/* import disciplines from "../routes/disciplineRoutes.js" */

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.send("vamooooo");
    })

    app.use(
        express.json(),
        users,
        roles,
        actions
        /*         disciplines */
    )
}

export default routes;
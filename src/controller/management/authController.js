import jwt from "jsonwebtoken";
import users from "../../model/User.js";

async function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Acesso negado");

    try {
        console.log(token)
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(1)
        console.log(payload.id)
        const checkUser = await users.findOne({ _id: payload.id });
        console.log(checkUser);
        console.log(1)
        console.log(checkUser.authKey)
        if (token !== checkUser.authKey) return res.status(401).send("Acesso negado - token invalido.")
        console.log(1)
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

export default auth;
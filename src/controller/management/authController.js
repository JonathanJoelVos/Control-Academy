import jwt from "jsonwebtoken";
import users from "../../model/User.js";

async function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(400).send("Acesso negado");

    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        const checkUser = await users.findOne({ _id: payload.id });
        if (token !== checkUser.authKey) return res.status(400).send("Acesso negado");
        const userUpdate = await users.findByIdAndUpdate(checkUser._id, {
            authKey: token
        })
        res.send(userUpdate);
    } catch (error) {
        res.status(401).send(error);
    }
}

export default auth;
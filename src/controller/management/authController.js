import jwt from "jsonwebtoken";
import users from "../../model/User.js";
import blacklist from '../../../redis/manipulation-blacklist.js'

async function verifyIfTokenExistsInBlacklists(token) {
    const checkTokenInBlacklist = await blacklist.verifyIfTokenExistsInBlacklist(token);
    if (checkTokenInBlacklist) {
        throw new jwt.JsonWebTokenError("Token expirado")
    }
}


async function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(400).send("Acesso negado");

    try {
        await verifyIfTokenExistsInBlacklists(token);
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        const checkUser = await users.findOne({ _id: payload.id });
        if (token !== checkUser.authKey) return res.status(400).send("Acesso negado");
        await users.findByIdAndUpdate(checkUser._id, {
            authKey: token
        })
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

export default auth;
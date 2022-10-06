import jwt from "jsonwebtoken";
import users from "../../model/User.js";
import blacklist from '../../../redis/manipulation-blacklist.js'

async function verifyIfTokenExistsInBlacklists(token) {
    const checkTokenInBlacklist = await blacklist.verifyIfTokenExistsInBlacklist(token);
    if (checkTokenInBlacklist) {
        throw new jwt.JsonWebTokenError("Token expirado");
    }
}


async function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(400).send("Acesso negado -  Token incorreto");

    try {
        await verifyIfTokenExistsInBlacklists(token);
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        const checkUser = await users.findOne({ _id: payload.id });
        if(!checkUser) return res.status(400).send('Acesso negado');
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

export default auth;
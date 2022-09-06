import users from "../../model/User.js";
import bcrypt from "bcrypt";
import crud from "../crud.js";
import jwt from "jsonwebtoken";
import blacklist from "../../../redis/manipulation-blacklist.js";

//fazer a logica de aparecer os papeis no front (aparecer só os existentes)

const createUser = async (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const user = await crud.create(req, res, users);
    if (user) {
        const newPassword = bcrypt.hashSync(user.password, salt);
        user.password = newPassword;
        user.authKey = "";
        await user.save();
    }
}

const readUser = (req, res) => {
    crud.read(res, users, "register")
}

const updateUser = (req, res) => {
    crud.update(req, res, users);
}

const deleteUser = (req, res) => {
    crud.remove(req, res, users);
}
const loginUser = async (req, res) => {
    try {
        const { cpf, password } = req.body;
        const checkUser = await users.findOne({ cpf: cpf });
        const passwordCheck = bcrypt.compareSync(password, checkUser.password);
        if (!passwordCheck) return res.status(400).send("Email ou senha incorretos");
        const payload = { id: checkUser._id, cpf: checkUser.cpf };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "15m" });
        res.header('Authorization', token);
        const userUpdate = await users.findByIdAndUpdate(checkUser._id, {
            authKey: token
        })
        res.status(200).send(userUpdate);
    } catch (err) {
        res.status(400).send("Email ou senha incorretoss");
    }
}

const logoutUser = async (req, res) => {
    try {
        const token = req.token;
        await blacklist.addTokenInBlacklist(token);
        res.send("logout feito")
    } catch (error) {
        res.status(400).send(error)
    }
}
const userControll = {
    createUser,
    updateUser,
    readUser,
    deleteUser,
    loginUser,
    logoutUser
}


export default userControll;


/*      static registerUser = (res, req) => {
         //recebe o papel e a turma e procura no banco 
     } */ 
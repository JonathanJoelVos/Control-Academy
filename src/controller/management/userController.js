import users from "../../model/User.js";
import bcrypt from "bcrypt";
import crud from "../crud.js";
import jwt from "jsonwebtoken";
import blacklist from "../../../redis/manipulation-blacklist.js";

//fazer a logica de aparecer os papeis no front (aparecer só os existentes)

const createUser = async (req, res) => {
    const body = req.body;
    if (!body.name) return res.status(400).send("Corpo da requisição incorreto");
    const salt = bcrypt.genSaltSync(12);
    const user = await crud.create(body, users);
    if (user.message) return res.status(400).send(user.message)
    res.status(201).send(user);
    const newPassword = bcrypt.hashSync(user.password, salt);
    user.password = newPassword;
    await user.save();
}

const readUser = async (req, res) => {
    const checkResponse = await crud.read(users, 'register');
    if (checkResponse.message) return res.status(400).send(checkResponse.message);
    res.status(200).send(checkResponse);
}

const readUsersById = async (req, res) => {
    const { id } = req.params;
    const checkResponse = await crud.readById(id, users);
    if (checkResponse.message == 'não encontrado') return res.status(404).send(checkResponse.message);
    if (checkResponse.error) return res.status(400).send(checkResponse.error)
    res.status(200).json(checkResponse);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const check = await crud.update(id, body, users);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Update feito com sucesso");
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const check = await crud.remove(id, users);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Removido com sucesso");
}
const loginUser = async (req, res) => {
    try {
        const { cpf, password } = req.body;
        const checkUser = await users.findOne({ cpf: cpf });
        const passwordCheck = bcrypt.compareSync(password, checkUser.password);
        if (!passwordCheck) return res.status(400).send("Email ou senha incorretos");
        const payload = { id: checkUser._id, cpf: checkUser.cpf };
        const token = jwt.sign(payload, process.env.TOKEN_SECRETS, { expiresIn: "60m" });
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
    readUsersById,
    deleteUser,
    loginUser,
    logoutUser
}


export default userControll;


/*      static registerUser = (res, req) => {
         //recebe o papel e a turma e procura no banco 
     } */ 
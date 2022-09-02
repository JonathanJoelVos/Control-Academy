import users from "../../model/User.js";
import bcrypt from "bcrypt";
import crud from "../crud.js";

//fazer a logica de aparecer os papeis no front (aparecer só os existentes)

const createUser = async (req, res) => {
    const salt = bcrypt.genSaltSync(12);
    const user = await crud.create(req, res, users);
    if (user) {
        const newPassword = bcrypt.hashSync(user.password, salt);
        user.password = newPassword;
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
        const checkUser = await users.find({ cpf: cpf });
        const passwordCheck = bcrypt.compareSync(password, checkUser[0].password);

        if (passwordCheck) {
            res.send(`Logado`);
        } else {
            res.status(400).send("Email ou senha incorretos")
        }
    } catch (err) {
        res.status(400).send("Email ou senha incorretoss");
    }
}
const userControll = {
    createUser,
    updateUser,
    readUser,
    deleteUser,
    loginUser
}


export default userControll;


/*      static registerUser = (res, req) => {
         //recebe o papel e a turma e procura no banco 
     } */ 
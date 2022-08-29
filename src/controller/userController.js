import users from "../model/User.js";
import bcrypt from "bcrypt";

class UserController {
    static createUser = async (req, res) => {
        try {
            const salt = bcrypt.genSaltSync(12);
            const user = new users(req.body);
            user.password = bcrypt.hashSync(user.password, salt);
            await user.save();
            res.status(201).send("Usuário cadastrado");
        } catch (err) {
            res.status(400).send(err);
        }

    }

    static loginUser = async (req, res) => {
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

    static registerUser = (res, req) => {
        //recebe o papel e a turma e procura no banco 
    }
}

export default UserController;
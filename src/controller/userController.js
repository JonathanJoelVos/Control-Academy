import users from "../model/User.js";

class UserController {
    static createUser = async (req, res) => {
        try {
            const user = new users(req.body);
            user.save((err, userDocs) => {
                err ? res.send(400).send(`Erro: ${err} ...`) : res.send(userDocs);
            })
        } catch (err) {
            res.status(400).send(err);
        }

    }

    static loginUser = async (req, res) => {
        const { cpf, password } = req.body
        const usera = users.find({ cpf: cpf })

        console.log(users),
            (userDocs) => {
                console.log(userDocs)
                const lenghtUser = userDocs.length
                if (lenghtUser > 0) {
                    userDocs.forEach((element) => {
                        if (element.password === password && lenghtUser > 0) {
                            res.send(`Logado: ${element}`)
                        } else {
                            res.status(400).send("se fudeu")
                        }
                    });
                }
            }

        /*          .catch (() => { res.status(400).send("") }) */

        if (users == '') {
            res.send("erro")
        }
    }
}

export default UserController;
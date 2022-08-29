import actionsModel from "../model/Action.js";
import papers from "../model/Paper.js";

class AdminController {
    //actions

    static createAction = async (req, res) => {
        try {
            const action = new actionsModel(req.body);
            await action.save();
            res.status(201).send(action);
        } catch (err) {
            res.status(404).send(err);
        }
    }

    static addMethodInActions = async (req, res) => {
        try {
            const { id } = req.params;
            const { methods } = req.body;
            const actionFind = await actionsModel.findById(id);
            const checkIfMethodsExists = actionFind.methods.every(element => {
                element != methods
            })
            if (checkIfMethodsExists) {
                actionFind.methods.push(methods);
                await actionFind.save();
                res.send("Adicionado com sucesso");
            } else {
                res.status(401).send("método já existente");
            }
        } catch (error) {
            res.status(401).send(error);
        }
    }

    //Role (paper)

    static createPaper = async (req, res) => {
        try {
            const { actions } = req.body;
            const checkActions = actions.every(async (element) => {
                await actionsModel.findById(element);
            });
            if (checkActions) {
                const paper = new papers(req.body);
                await paper.save();
                res.send(paper);
            } else {
                res.status(404).send({ message: "Erro ao cadastrar" })
            }
        } catch (err) {
            res.status(404).send(err);
        }
    }

    static addActionsInPapers = async (req, res) => {
        try {
            const { id } = req.params; //id do paper
            const { name } = req.body; //name da action
            const checkPaper = await papers.findById(id);
            const checkAction = await actionsModel.find({ name: name })
            const idInString = checkAction[0]._id.toString();
            const checkIfActionAlreadyExistsOnPaper = checkPaper
                .actions.find((element) => {
                    return element == idInString;
                });
            if (!checkIfActionAlreadyExistsOnPaper) {
                checkPaper.actions.push(checkAction[0]._id);
                await checkPaper.save();
                res.send("Ação adicionada com sucesso");
            } else {
                res.status(401).send("Ação ou papel inextente, ou papel já possui essa ação");
            }
        } catch (error) {
            res.status(401).send(error)
        }
    }

    static listPapers = async (req, res) => {
        try {
            const papersDocs = await papers.find().populate('actions');
            res.send(papersDocs);
        } catch (error) {
            res.status(401).send(error)
        }
    }
}

export default AdminController;
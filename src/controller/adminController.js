import actionsModel from "../model/Action.js";
import papers from "../model/Paper.js";
import disciplines from "../model/Discipline.js";

class AdminController {
    //actions ---------------------------------------------------- 

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

    //Role (paper) ----------------------------------------

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
            const { name } = req.query; //name da action
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

    //discipline ----------------------------------------

    static createDiscipline = async (req, res) => {
        try {
            const discipline = new disciplines(req.body);
            await discipline.save();
            res.send(discipline);
        } catch (error) {
            res.status(401).send(error)
        }
    }

    static updateDiscipline = async (req, res) => {
        try {
            const { id } = req.params;
            const teste = await disciplines.findByIdAndUpdate(id, { $set: req.body });
            res.json("Atualizado com sucesso.");

        } catch (error) {
            res.status(401).send(error)
        }
    }

    static removeDiscipline = async (req, res) => {
        try {
            const { id } = req.params;
            const checkDiscipline = await disciplines.findById(id);
            if (checkDiscipline) {
                await disciplines.findByIdAndRemove(id);
                res.send("Removido com sucesso");
            } else {
                res.status(401).send("Não foi possível remover")
            }
        } catch (error) {
            res.status(401).send(error)
        }
    }

    static listDisciplines = async (req, res) => {
        try {
            console.log(1)
            const checkDiscipline = await disciplines.find();
            console.log(checkDiscipline)
            if (checkDiscipline) {
                res.json(checkDiscipline);
            } else {
                res.status(401).send("Disciplina não funciona");
            }
        } catch (error) {
            res.status(401).send(error);
        }
    }

    static addClassInDisciplines = (req, res) => {
        try {
            const { name } = req.body;
            const { id } = req.params;
            const checkDiscipline = disciplines.findById(id);
            if(checkDiscipline){
                checkDiscipline.classes.
            }
        } catch (error) {
            res.status(401).send(error);
        }


    }
}

export default AdminController;
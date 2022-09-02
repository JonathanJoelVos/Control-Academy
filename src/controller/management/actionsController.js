import actions from "../../model/Action.js";
import crud from "../crud.js";

const createAction = (req, res) => {
    crud.create(req, res, actions);
}

const readActions = (req, res) => {
    crud.read(res, actions, 'methods');
}

const readActionsById = (req, res) => {
    crud.readById(req, res, actions);
}

const updateActions = (req, res) => {
    crud.update(req, res, actions);
}

const deleteActions = (req, res) => {
    crud.remove(req, res, actions);
}

const addMethodInActions = async (req, res) => {
    try {
        const { name } = req.query;
        const { method } = req.body;
        console.log('1')
        const actionFind = await actions.findOne({ name: name });
        const checkIfMethodsExists = actionFind.methods.every(element => element != method)
        if (checkIfMethodsExists) {
            actionFind.methods.push(method);
            await actionFind.save();
            res.send("Adicionado com sucesso");
        } else {
            res.status(401).send("método já existente");
        }
    } catch (error) {
        res.status(401).send(error);
    }
}

const deleteMethodInActions = async (req, res) => {
    try {
        const { name } = req.query;
        const { method } = req.body;
        const actionFind = await actions.findOne({ name: name });
        const checkIfMethodsExists = actionFind.methods.findIndex(element => element == method)
        if (checkIfMethodsExists != -1) {
            actionFind.methods.splice(checkIfMethodsExists, 1);
            await actionFind.save();
            res.send("Removido com sucesso");
        } else {
            res.status(401).send("método não existente");
        }
    } catch (error) {
        res.status(401).send(error);
    }
}

const actionController = {
    createAction,
    readActions,
    readActionsById,
    updateActions,
    deleteActions,
    addMethodInActions,
    deleteMethodInActions
}

export default actionController;
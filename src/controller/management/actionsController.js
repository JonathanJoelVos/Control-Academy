import actionsModel from "../../model/Action.js";


const createAction = async (req, res) => {
    try {
        const action = new actionsModel(req.body);
        await action.save();
        res.status(201).send(action);
    } catch (err) {
        res.status(404).send(err);
    }
}

const listActions = async (req, res) => {
    try {
        const checkAction = await actionsModel.find();
        res.status(201).json(checkAction);

    } catch (error) {
        res.status(404).send(error);
    }
}

const updateActions = async (req, res) => {
    try {
        const { id } = req.params;
        await actionsModel.findByIdAndUpdate(id, { $set: req.body });
        res.status(201).send("Update feito com sucesso");
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const deleteActions = async (req, res) => {
    try {
        const { id } = req.params;
        await actionsModel.findByIdAndDelete(id);
        res.status(201).send("Remoção feita com sucesso");
    } catch (error) {
        res.status(404).send(error);
    }
}

const addMethodInActions = async (req, res) => {
    try {
        const { name } = req.query;
        const { method } = req.body;
        const actionFind = await actionsModel.findOne({ name: name });
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
        const actionFind = await actionsModel.findOne({ name: name });
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
    listActions,
    updateActions,
    deleteActions,
    addMethodInActions,
    deleteMethodInActions
}

export default actionController;
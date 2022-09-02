import roles from '../../model/Role.js';
import actionsModel from '../../model/Action.js';
import crud from '../crud.js';

const createRole = (req, res) => {
    crud.create(req, res, roles);
}

const listRoles = (req, res) => {
    crud.read(res, roles, "actions");
}

const updateRoles = (req, res) => {
    crud.update(req, res, roles);
}

const deleteRoles = (req, res) => {
    crud.remove(req, res, roles);
}

const addActionsInRoles = async (req, res) => {
    try {
        const { id } = req.params; //id da role
        const { action } = req.query; //name da action
        const checkRoles = await roles.findById(id);
        const checkAction = await actionsModel.find({ name: action });
        const idInString = checkAction[0]._id.toString();
        const checkIfActionAlreadyExistsOnPaper = checkRoles
            .actions.every((element) => {
                return element != idInString;
            });
        if (checkIfActionAlreadyExistsOnPaper) {
            checkRoles.actions.push(checkAction[0]._id);
            await checkRoles.save();
            res.send("Ação adicionada com sucesso");
        } else {
            res.status(400).send("Ação ou papel inexistente, ou papel já possui essa ação");
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteActionsInRoles = async (req, res) => {
    try {
        const { role } = req.query;
        const { id } = req.params;
        const roleFind = await roles.findOne({ name: role });
        const checkIfActionExists = roleFind.actions.indexOf(id);
        if (checkIfActionExists != -1) {
            roleFind.actions.splice(checkIfActionExists, 1);
            await roleFind.save();
            res.send("Removido com sucesso");
        } else {
            res.status(401).send("método não existente");
        }
    } catch (error) {
        res.status(401).send(error);
    }
}


const roleControll = {
    createRole,
    listRoles,
    updateRoles,
    deleteRoles,
    addActionsInRoles,
    deleteActionsInRoles
}

export default roleControll;
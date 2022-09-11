import roles from '../../model/Role.js';
import actionsModel from '../../model/Action.js';
import crud from '../crud.js';

const createRole = async (req, res) => {
    const body = req.body;
    const checkResponse = await crud.create(body, roles);
    if (checkResponse.message) return res.status(401).send(checkResponse.message);
    res.status(201).send(body);
}

const listRoles = async (req, res) => {
    const checkResponse = await crud.read(roles, 'actions');
    if (checkResponse.message) return res.status(400).send(checkResponse.message);
    res.status(200).send(checkResponse);

}

const updateRoles = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const check = await crud.update(id, body, roles);
    if (check.message) return res.status(401).send(check.message);
    res.status(204).send("Update feito com sucesso");
}

const deleteRoles = async (req, res) => {
    const { id } = req.params;
    const check = await crud.remove(id, roles);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Removido com sucesso");
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
        if (!checkIfActionAlreadyExistsOnPaper) return res.status(400).send("Ação ou papel inexistente, ou papel já possui essa ação");
        checkRoles.actions.push(checkAction[0]._id);
        await checkRoles.save();
        res.send("Ação adicionada com sucesso");
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
        if (checkIfActionExists == -1) return res.status(401).send("método não existente");
        roleFind.actions.splice(checkIfActionExists, 1);
        await roleFind.save();
        res.send("Removido com sucesso");
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
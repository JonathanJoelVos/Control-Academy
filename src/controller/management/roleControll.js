import roles from '../../model/Role.js';
import actions from '../../model/Action.js';

const createRole = async (req, res) => {
    try {
        const role = new roles(req.body);
        await role.save();
        res.status(201).send(role);
    } catch (err) {
        res.status(404).send(err);
    }
}

const listRoles = async (req, res) => {
    try {
        const checkRole = await roles.find().populate('actions');
        res.status(201).json(checkRole);

    } catch (error) {
        res.status(404).send(error);
    }
}

const updateRoles = async (req, res) => {
    try {
        const { id } = req.params;
        await roles.findByIdAndUpdate(id, { $set: req.body });
        res.status(201).send("Update feito com sucesso");
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const deleteRoles = async (req, res) => {
    try {
        const { id } = req.params;
        await roles.findByIdAndDelete(id);
        res.status(201).send("Remoção feita com sucesso");
    } catch (error) {
        res.status(404).send(error);
    }
}

const addActionsInPapers = async (req, res) => {
    try {
        const { id } = req.params; //id da role
        const { name } = req.query; //name da action
        const checkRoles = await roles.findById(id);
        const checkAction = await actions.find({ name: name });
        const idInString = checkAction[0]._id.toString();
        const checkIfActionAlreadyExistsOnPaper = checkRoles
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

const roleControll = {
    createRole,
    listRoles,
    updateRoles,
    deleteRoles
}

export default roleControll;
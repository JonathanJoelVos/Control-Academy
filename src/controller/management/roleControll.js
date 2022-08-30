import roles from '../../model/Role.js';
import actions from '../../model/Action.js';

async function create(req, res, models) {
    try {
        const model = new models(req.body);
        await model.save();
        res.send(model)
    } catch (error) {
        res.status(404).send(error);
    }
}
async function read(res, model, populate = '') {
    try {
        const checkModel = await model.find()
        res.status(201).json(checkModel);
    } catch (error) {
        res.status(404).send(error);
    }
}

async function update(req, res, model) {
    try {
        const { id } = req.params;
        await model.findByIdAndUpdate(id, { $set: req.body });
        res.status(201).send("Update feito com sucesso");
    } catch (error) {
        res.status(404).send(error.message);
    }
}

async function remove(req, res, model) {
    try {
        const { id } = req.params;
        await model.findByIdAndDelete(id);
        res.status(201).send("Remoção feita com sucesso");
    } catch (error) {
        res.status(404).send(error);
    }
}


const createRole = (req, res) => {
    create(req, res, roles);
}


const listRoles = (req, res) => {
    read(res, roles, "actions");
}

const updateRoles = (req, res) => {
    update(req, res, roles);
}

const deleteRoles = async (req, res) => {
    remove(req, res, roles);
}

const addActionsInRoles = async (req, res) => {
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
    deleteRoles,
    addActionsInRoles
}

export default roleControll;
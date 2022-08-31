

async function create(req, res, models) {
    try {
        const model = new models(req.body);
        await model.save();
        res.send(model);
        return model;
    } catch (error) {
        res.status(404).send(error);
    }
}
async function readAndPopulate(res, model, populate = '',) {
    try {
        const checkModel = await model.find().populate(`${populate}`);
        res.status(201).json(checkModel);
    } catch (error) {
        res.status(404).send(error);
    }
}

async function read(res, model) {
    try {
        const checkModel = await model.find();
        res.status(201).json(checkModel);
    } catch (error) {
        res.status(404).send(error);
    }
}

async function update(req, res, model) {
    try {
        const { id } = req.params;
        const checkExists = await model.findByIdAndUpdate(id, { $set: req.body });
        if (checkExists) {
            res.status(201).send("Update feito com sucesso");
        } else {
            res.status(404).send("Não encontrada");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

async function remove(req, res, model) {
    try {
        const { id } = req.params;
        const checkExists = await model.findByIdAndDelete(id);
        if (checkExists) {
            res.status(201).send("Remoção feita com sucesso");
        } else {
            res.status(400).send("Erro ao remover");
        }
    } catch (error) {
        res.status(404).send(error);
    }
}

const crud = {
    create,
    remove,
    read,
    update,
    readAndPopulate
}

export default crud;
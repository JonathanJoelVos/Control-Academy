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
async function read(res, model, populate) {
    try {
        let checkModel = await model.find().populate(populate);
        if (!checkModel) return res.status(404).send("A solicitação não existe");
        res.status(201).json(checkModel);
    } catch (error) {
        res.status(404).send(error);
    }
}

async function readById(req, res, model) {
    try {
        const { id } = req.params;
        const checkModel = await model.findById(id);
        if (!checkModel) return res.status(404).send("Não encontrado");
        res.status(201).json(checkModel);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function update(req, res, model) {
    try {
        const { id } = req.params;
        const checkExists = await model.findByIdAndUpdate(id, { $set: req.body });
        if (!checkExists) return res.status(404).send("Não encontrada");
        res.status(201).send("Update feito com sucesso");
    } catch (error) {
        res.status(404).send(error.message);
    }
}

async function remove(req, res, model) {
    try {
        const { id } = req.params;
        const checkExists = await model.findByIdAndDelete(id);
        if (!checkExists) return res.status(400).send("Erro ao remover");
        res.status(201).send("Remoção feita com sucesso");
        return checkExists;
    } catch (error) {
        res.status(404).send(error);
    }
}

const crud = {
    create,
    remove,
    read,
    update,
    readById
}

export default crud;
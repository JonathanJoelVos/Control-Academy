import classes from "../../model/Class.js";
import subjects from '../../model/Subject.js';
import crud from "../crud.js";

const createClass = async (req, res) => {
    try {
        const bodyUse = req.body;
        const { name, subject } = req.body;
        if (!name) throw new Error("Corpo da requisição incorreto")
        const checkSubject = await subjects.findOne({ _id: subject });
        if (!checkSubject) throw new Error("Disciplina não existe");
        const array = [];
        for (let i = 0; i < checkSubject.classes.length; i++) {
            const classFind = await classes.findById({ _id: checkSubject.classes[i] });
            array.push(classFind)
        }
        const check = array.every(element => element.name != name);
        if (!check) throw new Error("Turma já existe.");
        const classCreate = await crud.create(bodyUse, classes);
        if (classCreate.message) return res.status(400).send(classCreate.message);
        res.status(201).send(classCreate);
        const id = classCreate.subject;
        const subjectFind = await subjects.findById(id);
        subjectFind.classes.push(classCreate._id);
        await subjectFind.save();
    } catch (error) {
        if (error.message === "Disciplina não existe") res.status(404).send(error.message);
        res.status(400).send(error.message);
    }
}

const readClasses = async (req, res) => {
    const checkResponse = await crud.read(classes, 'subject');
    if (checkResponse.message) return res.status(400).send(checkResponse.message);
    res.status(200).send(checkResponse);
}

const readClassesById = async (req, res) => {
    const { id } = req.params;
    const checkResponse = await crud.readById(id, classes);
    if (checkResponse.message == 'não encontrado') return res.status(404).send(checkResponse.message);
    if (checkResponse.error) return res.status(400).send(checkResponse.error)
    res.status(200).json(checkResponse);
}

const updateClass = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const check = await crud.update(id, body, classes);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Update feito com sucesso");
}

const deleteClass = async (req, res) => {
    const { id } = req.params;
    const check = await crud.remove(id, classes);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Removido com sucesso");
    const subjectClass = await subjects.findOne({ _id: check.subject });
    if (subjectClass) {
        const index = subjectClass.classes.findIndex(element => {
            return element.toString() == check._id.toString()
        })
        subjectClass.classes.splice(index, 1);
        await subjectClass.save();
    }

}

const classControll = {
    createClass,
    readClasses,
    readClassesById,
    updateClass,
    deleteClass
}

export default classControll;

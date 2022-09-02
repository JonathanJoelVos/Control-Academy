import classes from "../../model/Class.js";
import subjects from '../../model/Subject.js';
import crud from "../crud.js";

const createClass = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(1)
        const { subject } = req.body;
        const checkSubject = await subjects.findOne({ _id: subject });
        if (checkSubject) {
            const array = [];
            for (let i = 0; i < checkSubject.classes.length; i++) {
                const classFind = await classes.findById({ _id: checkSubject.classes[i] });
                array.push(classFind)
            }
            const check = array.every(element => element.name != name);
            if (check) {
                console.log(1)
                const classCreate = await crud.create(req, res, classes);
                const id = classCreate.subject;
                console.log(id);
                const subject = await subjects.findById(id);
                subject.classes.push(classCreate._id);
                await subject.save();
            } else {
                res.status(400).send("Turma já existe.");
            }
        } else {
            res.status(404).send("Disciplina não existe")
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const readClasses = (req, res) => {
    crud.read(res, classes, "subject");
}

const updateClass = (req, res) => {
    crud.update(req, res, classes);
}

const deleteClass = async (req, res) => {
    const classDelete = await crud.remove(req, res, classes);
    if (classDelete) {
        const subjectClass = await subjects.findOne({ _id: classDelete.subject });
        if (subjectClass) {
            const index = subjectClass.classes.findIndex(element => {
                return element.toString() == classDelete._id.toString()
            })
            subjectClass.classes.splice(index, 1);
            await subjectClass.save();
        }
    }
}




const classControll = {
    createClass,
    readClasses,
    updateClass,
    deleteClass
}

export default classControll;

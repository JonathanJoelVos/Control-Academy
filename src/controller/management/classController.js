import classes from "../../model/Class.js";
import disciplines from '../../model/Discipline.js';
import crud from "../crud.js";

const createClass = async (req, res) => {
    try {
        const { name } = req.body;
        const { discipline } = req.body;
        const checkDiscipline = await disciplines.findOne({ _id: discipline });
        const array = [];
        for (let i = 0; i < checkDiscipline.classes.length; i++) {
            const classFind = await classes.findById({ _id: checkDiscipline.classes[i] });
            array.push(classFind)
        }
        const check = array.every(element => element.name != name);
        if (check) {
            const classCreate = await crud.create(req, res, classes);
            const id = classCreate.discipline;
            const disciplene = await disciplines.findById(id);
            disciplene.classes.push(classCreate._id);
            await disciplene.save();
        } else {
            res.status(400).send("Turma já existe.");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const readClasses = (req, res) => {
    crud.read(res, classes, "discipline");
}

const updateClass = (req, res) => {
    crud.update(req, res, classes);
}

const deleteClass = async (req, res) => {
    const classDelete = await crud.remove(req, res, classes);
    if (classDelete) {
        const discipleneClass = await disciplines.findOne({ _id: classDelete.discipline });
        const index = discipleneClass.classes.findIndex(element => {
            return element.toString() == classDelete._id.toString()
        })
        discipleneClass.classes.splice(index, 1);
        await discipleneClass.save();
    }
}




const classControll = {
    createClass,
    readClasses,
    updateClass,
    deleteClass
}

export default classControll;

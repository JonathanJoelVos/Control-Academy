import classes from "../../model/Class.js";
import disciplines from '../../model/Discipline.js';
import crud from "../crud.js";

/* const insertClassInDiscipline = async (id, model) => {
    await model.findById(id);
    console.log(disciplene)
    disciplene.forEach(element => {
        element.classes.push(id);
        disciplene.save();
    });
} */

const createClass = async (req, res) => {
    const classCreate = await crud.create(req, res, classes);
    if (classCreate) {
        const id = classCreate.discipline;
        const disciplene = await disciplines.findById(id);
        disciplene.classes.push(classCreate._id);
        await disciplene.save();
    }
}

const readClasses = (req, res) => {
    crud.read(res, classes, "discipline");
}

const updateClass = (req, res) => {
    crud.update(req, res, classes);
}

const deleteClass = async (req, res) => {
    const classRemoved = await crud.remove(req, res, classes);
    if (classRemoved) {
        const idClass = classRemoved._id;
        const discipleneToRemovedClass = await disciplines.findById(classRemoved.discipline);
        const index = discipleneToRemovedClass.classes.findIndex(element => {
            return element.toString() == idClass.toString();
        });
        discipleneToRemovedClass.classes.splice(index, 1);
        await discipleneToRemovedClass.save();
    }
}




const classControll = {
    createClass,
    readClasses,
    updateClass,
    deleteClass
}

export default classControll;

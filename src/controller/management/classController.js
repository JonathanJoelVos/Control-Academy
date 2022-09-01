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
} 
if (checkDiscipline.classes.length > 0) 
else {
            const classCreate = await crud.create(req, res, classes);
            if (classCreate) {
                const id = classCreate.discipline;
                const disciplene = await disciplines.findById(id);
                disciplene.classes.push(classCreate._id);
                await disciplene.save();
            }
*/

const createClass = async (req, res) => {
    try {
        const { name } = req.body;
        const { discipline } = req.body;
        const checkDiscipline = await disciplines.findOne({ _id: discipline });
        const array = checkDiscipline.classes.map(async (element) => {
            const cu = await classes.findById({ _id: element });
            console.log(cu);
            return cu;
        })
        console.log(array)
        const check = checkDiscipline.classes.every(async (element) => {
            const classFind = await classes.findById({ _id: element });
            console.log(classFind.name, name)
            return name == classFind.name;
        });
        console.log(check)
        if (check) {
            const classCreate = await crud.create(req, res, classes);
            const id = classCreate.discipline;
            const disciplene = await disciplines.findById(id);
            disciplene.classes.push(classCreate._id);
            await disciplene.save();
        } else {
            res.status(400).send("Cu");
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
    const discipleneClass = await disciplines.findOne({ _id: classDelete.discipline });
    const index = discipleneClass.classes.findIndex(element => {
        return element.toString() == classDelete._id.toString()
    })
    discipleneClass.classes.splice(index, 1);
    await discipleneClass.save();
}




const classControll = {
    createClass,
    readClasses,
    updateClass,
    deleteClass
}

export default classControll;

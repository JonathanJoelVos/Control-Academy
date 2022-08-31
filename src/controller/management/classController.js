import classes from "../../model/Class.js";
import disciplines from '../../model/Discipline.js';
import crud from "../crud.js";

const insertClassInDiscipline = async (id, model) => {
    const disciplene = await model.findById(id);
    console.log(disciplene)
    disciplene.forEach(element => {
        element.classes.push(id);
        disciplene.save();
    });
}

const createClass = async (req, res) => {
    const { discipline } = req.body;
    const checkDisciple = disciplines.find({ name: discipline });
    if (checkDisciple) {
        const classCreate = await crud.create(req, res, classes);
        const id = classCreate.disciplene;
        console.log(id)
        insertClassInDiscipline(id, disciplines)
    } else {
        res.status(401).send("Disciplina não existe");
    }
}

const readClasses = (req, res) => {
    crud.readAndPopulate(res, classes, "discipline");
}

const updateClass = (req, res) => {
    crud.update(req, res, classes);
}

const deleteClass = (req, res) => {
    crud.remove(req, res, classes);
}



const classControll = {
    createClass,
    readClasses,
    updateClass,
    deleteClass
}

export default classControll;
/* class ClassController {
    static createClass = async (req, res) => {
        try {
            const newClass = new classes(req.body);
            const checkDisciples = await disciplines.find({ name: newClass.discipline })
            if (checkDisciples) {
                await newClass.save();
                res.status(201).send("Disciplina cadastrada!");
            } else {
                res.status(401).send("Disciplina não existe!")
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }

    static assingClassToASubject = async (req, res) => {
        try {
            const { className } = req.body;
            const checkClass = await classes.find({ name: className });
            if (checkClass) {
                checkClass.forEach(element => {
                    element.discipline = className
                })
            }
        } catch (err) {
            res.status(401).send(err);
        }
    }
} */
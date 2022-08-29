import classes from "../model/Class.js";
import disciplines from '../model/Discipline.js';

class ClassController {
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
}

export default ClassController;
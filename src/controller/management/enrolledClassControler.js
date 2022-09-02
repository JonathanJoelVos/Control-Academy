import enrolledClass from "../../model/EnrolledClass.js"
import crud from "../crud.js";
import users from "../../model/User.js";
import classes from "../../model/Class.js";

const createEnrolled = async (req, res) => {
    try {
        const { idUser, classGroup } = req.body;
        const user = await users.findById(idUser);
        const classFind = await classes.findById(classGroup);
        if (classFind) {
            const arrayEnrolleds = [];
            for (let i = 0; i < classFind.enrolled.length; i++) {
                const enrolledFind = await enrolledClass.findById(classFind.enrolled[i]);
                if (enrolledFind) {
                    arrayEnrolleds.push(enrolledFind);
                }
            }
            const checkIfUserEnrolledInClass = arrayEnrolleds.some(element => {
                return element.idUser.toString() == idUser.toString();
            })
            if (!checkIfUserEnrolledInClass) {
                const enrolled = await crud.create(req, res, enrolledClass);
                if (enrolled) {
                    user.register.push(enrolled._id);
                    await user.save();
                    classFind.enrolled.push(enrolled._id);
                    await classFind.save();
                }
            } else {
                res.status(404).send("CPF já está nessa turma");
            }
        } else {
            res.status(404).send("Turma não existe")
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const readEnrolled = async (req, res) => {
    try {
        let checkModel = await enrolledClass.find().populate("role").populate("classGroup").populate("idUser");
        res.status(201).json(checkModel);
    } catch (error) {
        res.status(404).send(error);
    }
}

const updateEnrolled = (req, res) => {
    crud.update(req, res, enrolledClass);
}

const deleteEnrolled = async (req, res) => {
    const enrolledRemove = await 
    crud.remove(req, res, enrolledClass);
}

const enrolledControll = {
    createEnrolled,
    readEnrolled,
    deleteEnrolled,
    updateEnrolled
}

export default enrolledControll;
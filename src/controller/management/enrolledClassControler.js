import enrolledClass from "../../model/EnrolledClass.js"
import crud from "../crud.js";
import users from "../../model/User.js";

const createEnrolled = async (req, res) => {
    try {
        const { cpf } = req.query;
        const { classGroup } = req.body;
        const user = await users.findOne({ cpf: cpf });
        const check = user.register.some(async element => {
            const register = await enrolledClass.findById(element);
            if (register) {
                return register.classGroup.toString() == classGroup;
            }
        })
        if (!check) {
            const enrolled = await crud.create(req, res, enrolledClass);
            user.register.push(enrolled._id);
            await user.save();
        } else {
            res.status(400).send("CPF já está nessa turma");
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

const readEnrolled = async (req, res) => {
    try {
        let checkModel = await enrolledClass.find().populate("role").populate("classGroup");
        res.status(201).json(checkModel);
    } catch (error) {
        res.status(404).send(error);
    }
}

const updateEnrolled = (req, res) => {
    crud.update(req, res, enrolledClass);
}

const deleteEnrolled = (req, res) => {
    crud.remove(req, res, enrolledClass);
}

const enrolledControll = {
    createEnrolled,
    readEnrolled,
    deleteEnrolled,
    updateEnrolled
}

export default enrolledControll;
import enrolledClass from "../../model/EnrolledClass.js"
import crud from "../crud.js";
import users from "../../model/User.js";
import classes from "../../model/Class.js";

const createEnrolled = async (req, res) => {
    try {
        const bodyUse = req.body;
        const { idUser, classGroup } = req.body;
        const user = await users.findById(idUser);
        const classFind = await classes.findById(classGroup);
        if (!classFind) return res.status(404).send("Turma não existe");
        const arrayEnrolleds = [];
        for (let i = 0; i < classFind.enrolled.length; i++) {
            const enrolledFind = await enrolledClass.findById(classFind.enrolled[i]);
            if (enrolledFind) {
                arrayEnrolleds.push(enrolledFind);
            }
        }
        const checkIfUserEnrolledInClass = arrayEnrolleds.some(element => {
            return element.idUser.toString() == idUser.toString();
        });
        if (checkIfUserEnrolledInClass) return res.status(404).send("CPF já está nessa turma");
        const enrolled = await crud.create(bodyUse, enrolledClass);
        if (enrolled.message) return res.status(404).send(enrolled.message);
        res.status(201).send(enrolled);
        user.register.push(enrolled._id);
        await user.save();
        classFind.enrolled.push(enrolled._id);
        await classFind.save();
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

const updateEnrolled = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const check = await crud.update(id, body, enrolledClass);
    if (check.message) return res.status(401).send(check.message);
    res.status(204).send("Update feito com sucesso");
}

const deleteEnrolled = async (req, res) => {
    const { id } = req.params;
    const check = await crud.remove(id, enrolledClass);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Removido com sucesso");
    const idUser = check.idUser._id;
    const classGroup = check.classGroup._id;
    const classFind = await classes.findById(classGroup);
    const indexClass = classFind.enrolled.findIndex(element => element == classGroup);
    classFind.enrolled.splice(indexClass, 1);
    await classFind.save()
    const userFind = await users.findById(idUser)
    const indexUser = userFind.register.findIndex(element => {
        return element.toString() == check._id.toString();
    });
    userFind.register.splice(indexUser, 1);
    await userFind.save();
}

const enrolledControll = {
    createEnrolled,
    readEnrolled,
    deleteEnrolled,
    updateEnrolled
}

export default enrolledControll;  
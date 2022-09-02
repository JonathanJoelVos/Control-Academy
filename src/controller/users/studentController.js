import users from "../../model/User.js";
import enrolledClass from "../../model/EnrolledClass.js";


class StudentController {
    static viewAllFinalGradeAndFrequency = async (req, res) => {
        const { id } = req.params;
        const user = await users.findById(id);
        const arrayUserEnrolledsClass = [];
        if (user) {
            for (let i = 0; i < user.register.length; i++) {
                const findEnrolledClass = await enrolledClass.findById(user.register[i]).populate("classGroup").populate("role");
                arrayUserEnrolledsClass.push(findEnrolledClass);
            }
            res.send(arrayUserEnrolledsClass);
        } else {
            res.status(404).send("Erro")
        }
    }

    static viewFinalGradeAndFrequency = async (req, res) => {
        const { id } = req.params;//id user
        const { name } = req.query; // name da turma
        const user = await users.findById(id);
        const arrayUserEnrolledsClass = [];
        if (user) {
            for (let i = 0; i < user.register.length; i++) {
                const findEnrolledClass = await enrolledClass.findById(user.register[i]).populate("classGroup").populate("role");
                arrayUserEnrolledsClass.push(findEnrolledClass);
            }
            const newArray = arrayUserEnrolledsClass.filter((element) => {
                return element.classGroup.name == name;
            })
            res.send(newArray);
        } else {
            res.status(404).send("Erro")
        }
    }
}

export default StudentController; 
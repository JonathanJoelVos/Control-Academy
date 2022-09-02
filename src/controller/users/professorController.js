import enrolledClass from "../../model/EnrolledClass.js";

class ProfessorController {
    static giveGradeAndFrequency = async (req, res) => {
        try {
            const { id } = req.params;
            const { finalGrade, frequency } = req.body;
            const checkExists = await enrolledClass.findByIdAndUpdate(id, { finalGrade: finalGrade, frequency: frequency });
            if (checkExists) {
                res.status(201).send("Update feito com sucesso");
            } else {
                res.status(404).send("Não encontrada");
            }
        } catch (error) {
            res.status(404).send(error.message);
        }
    }
}

export default ProfessorController;
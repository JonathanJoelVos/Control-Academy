import disciplines from '../model/Discipline.js';

class DisciplineController {
    static createDiscipline = async (req, res) => {
        try {
            const discipline = new disciplines(req.body);
            await discipline.save();
            res.send(discipline);
        } catch (err) {
            res.status(401).send(err);
        }
    }

    static registerClassInDiscipline = async (req, res) => {
        try {
            const { id } = req.headear;
            const { nameDiscipline } = req.body;
            const checkDisciplines = await disciplines.find({ name: nameDiscipline });
            if (checkDisciplines) {
                checkDisciplines.forEach(async (element) => {
                    element.classes.push(id);
                    await disciplines.save();
                })
            } else {
                res.status(401).send("Erro ao cadastrar disciplina");
            }
        } catch (err) {
            res.status(401).send(err);
        }
    }
}

export default DisciplineController;
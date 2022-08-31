import disciplines from '../../model/Discipline.js';
import crud from '../crud.js';

const createDiscipline = (req, res) => {
    crud.create(req, res, disciplines);
}

const readDisciplenes = (req, res) => {
    crud.read(res, disciplines, "classes");
}

const updateDiscipline = (req, res) => {
    crud.update(req, res, disciplines);
}

const deleteDiscipline = (req, res) => {
    crud.remove(req, res, disciplines);
}


const registerClassInDiscipline = async (req, res) => {
    try {
        const { id } = req.params;
        const { as } = req.headers;
        const checkDisciplines = await disciplines.find({ name: classes });
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

const disciplineControll = {
    createDiscipline,
    readDisciplenes,
    deleteDiscipline,
    updateDiscipline,
    registerClassInDiscipline
}

export default disciplineControll;
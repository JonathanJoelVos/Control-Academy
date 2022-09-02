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


const disciplineControll = {
    createDiscipline,
    readDisciplenes,
    deleteDiscipline,
    updateDiscipline
}

export default disciplineControll;
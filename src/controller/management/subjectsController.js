import subjects from '../../model/Subject.js';
import crud from '../crud.js';

const createSubject = (req, res) => {
    crud.create(req, res, subjects);
}

const readSubject = (req, res) => {
    crud.read(res, subjects, "classes");
}

const readSubjectById = (req, res) => {
    crud.readById(req, res, subjects)
}

const updateSubject = (req, res) => {
    crud.update(req, res, subjects);
}

const deleteSubject = (req, res) => {
    crud.remove(req, res, subjects);
}


const subjectControll = {
    createSubject,
    readSubject,
    readSubjectById,
    deleteSubject,
    updateSubject
}

export default subjectControll;
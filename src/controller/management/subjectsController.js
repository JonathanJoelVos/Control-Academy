import subjects from '../../model/Subject.js';
import crud from '../crud.js';

const createSubject = async (req, res) => {
    const body = req.body;
    const checkResponse = await crud.create(body, subjects);
    if (checkResponse.message) return res.status(401).send(checkResponse.message);
    res.status(201).send(body);
}

const readSubject = async (req, res) => {
    const checkResponse = await crud.read(subjects, 'classes');
    if (checkResponse.message) return res.status(400).send(checkResponse.message);
    res.status(200).send(checkResponse);

}

const readSubjectById = async (req, res) => {
    const { id } = req.params;
    const checkResponse = await crud.readById(id, subjects);
    if (checkResponse.message == 'não encontrado') return res.status(404).send(checkResponse.message);
    if (checkResponse.error) return res.status(400).send(checkResponse.error)
    res.status(200).send(checkResponse);
}
const updateSubject = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const check = await crud.update(id, body, subjects);
    if (check.message) return res.status(401).send(check.message);
    res.status(204).send("Update feito com sucesso");
}

const deleteSubject = async (req, res) => {
    const { id } = req.params;
    const check = await crud.remove(id, subjects);
    if (check.message) return res.status(404).send(check.message);
    res.status(204).send("Removido com sucesso");
}

const subjectControll = {
    createSubject,
    readSubject,
    readSubjectById,
    deleteSubject,
    updateSubject
}

export default subjectControll;
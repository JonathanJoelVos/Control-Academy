import papers from "../../model/Role.js";
import disciplines from "../../model/Discipline.js";
import actionController from "../management/actionsController.js";
import roleControll from "../management/roleControll.js";

class AdminController {
    //actions ---------------------------------------------------- 

    static createAction = actionController.createAction;
    static listActions = actionController.listActions;
    static updateActions = actionController.updateActions;
    static deleteActions = actionController.deleteActions;
    static addMethodInActions = actionController.addMethodInActions;
    static deleteMethodInActions = actionController.deleteMethodInActions;

    //Role (paper) -----------------------------------------------------------------------------------------------------

    static createRole = roleControll.createRole;
    static listRoles = roleControll.listRoles;
    static updateRoles = roleControll.updateRoles;
    static deleteRoles = roleControll.deleteRoles;

    //discipline ----------------------------------------

    static createDiscipline = async (req, res) => {
        try {
            const discipline = new disciplines(req.body);
            await discipline.save();
            res.send(discipline);
        } catch (error) {
            res.status(401).send(error)
        }
    }

    static updateDiscipline = async (req, res) => {
        try {
            const { id } = req.params;
            const teste = await disciplines.findByIdAndUpdate(id, { $set: req.body });
            res.json("Atualizado com sucesso.");

        } catch (error) {
            res.status(401).send(error)
        }
    }

    static removeDiscipline = async (req, res) => {
        try {
            const { id } = req.params;
            const checkDiscipline = await disciplines.findById(id);
            if (checkDiscipline) {
                await disciplines.findByIdAndRemove(id);
                res.send("Removido com sucesso");
            } else {
                res.status(401).send("Não foi possível remover")
            }
        } catch (error) {
            res.status(401).send(error)
        }
    }

    static listDisciplines = async (req, res) => {
        try {
            console.log(1)
            const checkDiscipline = await disciplines.find();
            console.log(checkDiscipline)
            if (checkDiscipline) {
                res.json(checkDiscipline);
            } else {
                res.status(401).send("Disciplina não funciona");
            }
        } catch (error) {
            res.status(401).send(error);
        }
    }

    /*     static addClassInDisciplines = (req, res) => {
            try {
                const { name } = req.body;
                const { id } = req.params;
                const checkDiscipline = disciplines.findById(id);
                if (checkDiscipline) {
                    checkDiscipline.classes.
                }
            } catch (error) {
                res.status(401).send(error);
            }
    
    
        } */
}

export default AdminController;
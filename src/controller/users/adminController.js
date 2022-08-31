import actionControll from "../management/actionsController.js";
import classControll from "../management/classController.js";
import disciplineControll from "../management/disciplinesController.js";
import roleControll from "../management/roleControll.js";

class AdminController {
    //actions ---------------------------------------------------- 
    static actionControll = actionControll;

    //Role (paper) -----------------------------------------------------------------------------------------------------
    static roleControll = roleControll;

    //discipline ----------------------------------------
    static disciplineControll = disciplineControll

    //classes ---------------------------------------------
    static classControll = classControll;
}

export default AdminController;
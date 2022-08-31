import actionControll from "../management/actionsController.js";
import classControll from "../management/classController.js";
import disciplineControll from "../management/disciplinesController.js";
import roleControll from "../management/roleControll.js";

class AdminController {
    static actionControll = actionControll;
    static roleControll = roleControll;
    static disciplineControll = disciplineControll
    static classControll = classControll;
}

export default AdminController;
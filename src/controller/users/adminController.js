import actionControll from "../management/actionsController.js";
import classControll from "../management/classController.js";
import disciplineControll from "../management/disciplinesController.js";
import enrolledControll from "../management/enrolledClassControler.js";
import roleControll from "../management/roleControll.js";
import userControll from "../management/userController.js";

class AdminController {
    static actionControll = actionControll;
    static roleControll = roleControll;
    static disciplineControll = disciplineControll
    static classControll = classControll;
    static userControll = userControll;
    static enrolledControll = enrolledControll;
}

export default AdminController;
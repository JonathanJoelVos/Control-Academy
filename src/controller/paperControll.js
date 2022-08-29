import papers from '../model/Paper.js';
import actionsBank from '../model/Action.js';

class PaperControll {


    static viewPapers = async (req, res) => {
        try {
            const paper = await papers.find().populate('actions');
            res.send(paper);
        } catch (err) {
            res.status(401).send(err);
        }
    }

}

export default PaperControll;
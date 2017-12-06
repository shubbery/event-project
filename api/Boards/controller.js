const Board = require("./model.js");
const boards = {};

//GET METHOD
boards.getBoards = (req, res) => {
    //find boards documents in mongoDB
    Board.find({ event_id: req.params.event_id })
    .then(doc => {
        res.status(200).send(doc);
    })
    .catch(err => {
        res.status(400).send(err);
    });
};

//POST METHOD
boards.postBoard = (req, res) => {
    const board = new Board(req.body);

    boards.save()
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(500).send(err));
};

//PUT METHOD
boards.editBoard = (req, res) => {
    const model = req.body;
    const board = Board.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).send(err);
        } else {
            delete req.body_id;
            const updatedBoard = Object.assign(doc, model);

            updatedBoard.save()
            .then(doc => res.status(200).send(doc))
            .catch(err => res.status(500).send(err));
        }
    });
};

//DELETE METHOD
boards.deleteBoard = (req, res) => {
    const boardID = req.params.id;
    Board.remove({_id: boardID}, (err, doc) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: '💀 Board has been deleted 💀' });
        }
    });
};

//export the boards object
module.exports = boards;
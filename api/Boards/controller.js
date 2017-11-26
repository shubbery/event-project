const Board = require("./model.js");
const boards = {};

//GET METHOD
boards.getBoards = (req, res) => {
    Board.find((err, docs) => {
        if(err){
            res.status(400).send(err);
        } else{
            res.status(200).send(docs);
        }
    });
}

boards.getBoardById = (req, res) => {
    const boardId = req.params.id;
    Board.findOne({
        _id: boardId
    }).then(doc => {
        res.status(200).send(doc);
    });
}

boards.getBoardByEventId = (req, res) => {
    const eventId = req.params.event_id;
    // console.log(eventId);
    Board.find({ "event_id": eventId }, (err, docs) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(docs);
        }
    });
}

//POST METHOD
boards.postBoard = (req, res) => {
    const boardModel = new Board();
    const model = req.body;
    const board = Object.assign(boardModel, model);

    board.save((err, doc) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(doc);
        }
    });
}

//DELETE METHOD
boards.deleteBoard = (req, res) => {
    const boardId = req.params.id;

    Board.remove({ _id: boardId }, (err, doc) => {
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).json({ message: '🌊 board has been deleted 🌊' });
        }
    });
}

//PUT METHOD
boards.editBoard = (req, res) => {
    const model = req.body;
    const board = Board.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).send(err);
        } else{
            delete req.body._id;
            const updatedBoard = Object.assign(doc, model);
            updatedBoard.save((err, doc) => {
                if(err){
                    res.status(500).send(err);
                } else{
                    res.status(200).send(doc);
                }
            });
        }
    });
}

//export the boards object
module.exports = boards;
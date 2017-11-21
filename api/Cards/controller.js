const Card = require("./model.js");
const cards = {};

//GET METHOD - get cards data
cards.getCards = (req, res) => {
    //find the card documents in mongoDB
    Card.find((err, docs) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).send(docs);
        }
    });
}

cards.getCardById = (req, res) => {
    const cardId = req.params.id;
    Card.findOne({
        _id: cardId
    }).then(doc => {
        res.status(200).send(doc)
    });
}

//POST METHOD - add new cards to a board
cards.postCard = (req, res) => {
    const cardModel = new Card();
    const model = req.body;
    const card = Object.assign(cardModel, model);

    card.save((err, doc) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).send(doc);
        }
    });
}

//DELETE METHOD
cards.deleteCard = (req, res) => {
    const cardId = req.params.id;
    Card.remove({ _id: cardId }, (err, doc) => {
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).json({message: '🔥 Card has been deleted 🔥'});
        }
    });
}

//PUT METHOD
cards.editCard = (req, res) => {
    const model = req.body;
    const card = Card.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).send(err);
        } else {
            delete req.body._id;
            const updatedEvent = Object.assign(doc, model);
            updatedEvent.save((err, doc) => {
                if(err){
                    res.status(500).send(err);
                } else{
                    res.status(200).send(doc);
                }
            });
        }
    });
}

module.exports = cards;
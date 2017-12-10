const Card = require("./model.js");
const cards = {};

//GET METHOD
cards.getCards = (req, res) => {
    Card.find({ board_id: req.params.board_id })
    .then(doc => {
        res.status(200).send(doc);
    })
    .then(err => {
        res.status(400).send(err);
    });
};

//POST METHOD
cards.postCard = (req, res) => {
    const card = new Card(req.body);
    card.save()
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(500).send(err));
};

//DELETE METHOD
cards.deleteCard = (req, res) => {
    const cardID = req.params.id;
    
    Card.remove({ _id: cardID }, (err, doc) => {
        if(err){
            res.status(500).send(err);
        } else{
            res.status(200).json({ message: 'Card has been deleted 👋 baiii' });
        }
    });
};

//PUT METHOD
cards.editCard = (req, res) => {
    const model = req.body;
    const card = Card.findById(req.params.id, (err, doc) => {
        if (err){
            res.status(500).send(err);
        } else {
            delete req.body._id;
            const updatedCard = Object.assign(doc, model);
            updatedCard.save((err, doc) => {
                if(err){
                    res.status(500).send(err);
                } else{
                    res.status(200).send(doc);
                }
            });
        }
    });
};

module.exports = cards;
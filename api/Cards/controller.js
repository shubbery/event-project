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

module.exports = cards;
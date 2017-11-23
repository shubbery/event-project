const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    input: String,
    board_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], //empty obj of user ids
});

module.exports = mongoose.model('Card', CardSchema);
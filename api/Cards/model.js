const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    board_id: String,
    input: String,
    members: Object, //empty obj of user ids
    //_someId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Card', CardSchema);
const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    content: String,
    board_id: mongoose.Schema.Types.ObjectId,
    // members: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model('Card', CardSchema);
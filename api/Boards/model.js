const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: String,
    event_id: mongoose.Schema.Types.ObjectId, //this is the event's unique mongoDB id
    author: mongoose.Schema.Types.ObjectId, //this is the event admin's unique mongoDB id
});

module.exports = mongoose.model('Board', BoardSchema);
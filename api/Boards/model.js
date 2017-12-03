const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    name: String,
    event_id: 
});

module.exports = mongoose.model('Board', BoardSchema);
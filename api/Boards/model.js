const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
    name: String,
    event_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },]
});

module.exports = mongoose.model('Board', BoardSchema);
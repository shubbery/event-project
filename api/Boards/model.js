const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
    event_id: String,
    name: String,
    list_items: Object, //empty obj of list item ids
    //_someId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Board', BoardSchema);
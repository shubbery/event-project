const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: String,
    date: Number,
    loc: String,
    desc: String,
    //# of attendees - to add once user schema is up (after auth lesson)
    boards: Object, //empty obj of board ids
    //_someId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Event', EventSchema);

const BoardSchema = mongoose.Schema({
    event_id: String,
    name: String,
    list_items: Object, //empty obj of list item ids
    //_someId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Board', BoardSchema);

const ListItemSchema = mongoose.Schema({
    board_id: String,
    input: String,
    members: Object, //empty obj of user ids
    //_someId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('ListItem', ListItemSchema);
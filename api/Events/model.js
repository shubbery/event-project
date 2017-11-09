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
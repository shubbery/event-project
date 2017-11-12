const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    loc: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        minlength: 1,
        maxlength: 288
    },
    //# of attendees - to add once user schema is up (after auth lesson)
    // boards: Object, //empty obj of board ids - (after multiple routes and models lesson)
    //_someId: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Event', EventSchema);
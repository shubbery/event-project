const mongoose = require('mongoose');
// require("../Boards/model");

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Object,
        required: true
    },
    loc: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        minlength: 1
    },
    // boards: [BoardSchema]
    //# of attendees - to add once user schema is up (after auth lesson)
});

module.exports = mongoose.model('Event', EventSchema);
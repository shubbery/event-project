const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
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
    }
    //# of attendees - to add once user schema is up (after auth lesson)
});

module.exports = mongoose.model('Event', EventSchema);
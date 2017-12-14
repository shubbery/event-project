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
    },
    admin: mongoose.Schema.Types.ObjectId,
    invitees: [mongoose.Schema.Types.ObjectId],
    attending: [mongoose.Schema.Types.ObjectId],
    notAttending: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Event', EventSchema);
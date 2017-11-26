const mongoose = require('mongoose');

<<<<<<< HEAD
const BoardSchema = new mongoose.Schema({
    name: String
});
=======
const BoardSchema = mongoose.Schema({
    name: String,
    event_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },]
});

module.exports = mongoose.model('Board', BoardSchema);
>>>>>>> 56ec648fa9cb17fc83483692325190e6bff83c6b

const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    //password -- encrypt
    //photo
    //admin array
    //organizer array
    //attending array
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model("User", UserSchema);

const UserAllergy = mongoose.Schema({
    //user_id
    //allergy culprit
    //allergy severity
    //allergy handle (digest or airborn)
});

// module.exports = mongoose.model("User Allergy", UserAllergy);

const UserDiet = mongoose.Schema({
    //user_id
    //dietary restrictions string
});

// module.exports = mongoose.model("User Diet", UserDiet);
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    //first name
    //last name
    //email
    //password -- encrypt
    //photo
    //admin array
    //organizer array
    //attending array
});

// module.exports = mongoose.model("User", UserSchema);

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
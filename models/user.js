const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSChema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true, maxLength:100 },
        secondName: { type: String, maxLength:100 },
        membershipStatus: { type:String, required: true, enum:["Regular", "Administrator"], default:"Regular" },
    }
);

module.exports = mongoose.model('User', UserSChema);
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSChema = new Schema(
    {
        username,
        password,
        firstName,
        secondName,
        membershipStatus,
    }
);

module.exports = mongoose.model('User', UserSChema);
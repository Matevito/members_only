const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true, maxLength:100 },
        secondName: { type: String, maxLength:100 },
        membershipStatus: { type:String, enum:["Regular", "Member", "Admin"], default:"Regular" },
    }
);

UserSchema
.virtual("formatted_name")
.get(function(){
    return this.secondName + ", " + this.firstName;
})

module.exports = mongoose.model('User', UserSchema);
const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
        title,
        timestamp,
        text,
        author,
    }
)

module.exports = mongoose.model('Message', MessageSchema);
const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
        title,
        text,
        author,
        timestamp,
    }
)

module.exports = mongoose.model('Message', MessageSchema);
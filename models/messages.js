const mongoose = require("mongoose");

const { DateTime } = require("luxon");

const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
        title: { type: String, required: true, maxLength:100},
        text: { type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref:"User", required: true },
        timestamp: { type: Date, required: true },
    }
)

//Virtual of formatted timestamp
MessageSchema
.virtual("formatted_time")
.get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
})

module.exports = mongoose.model('Message', MessageSchema);
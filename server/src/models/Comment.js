const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    }
});

module.export = mongoose.model("Comment", commentSchema)
const mongoose = require("mongoose");

const newAdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
    },
    requiredSkills: [String],
    postingDate: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categories: [String],
    contractType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Freelance', 'Other'],
    },
});

module.exports = mongoose.model("NewAd", newAdSchema);
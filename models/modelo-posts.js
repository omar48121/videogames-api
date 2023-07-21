const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("post", postSchema, "posts");
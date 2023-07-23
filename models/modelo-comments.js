const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    }
});

module.exports = model("comment", commentSchema, "comments");
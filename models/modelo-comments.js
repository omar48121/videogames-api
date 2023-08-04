const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    userFullName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

commentSchema.pre('save', function (next) {
    // Restar 6 horas a la fecha actual
    this.date.setHours(this.date.getHours() - 6);
    next();
});

module.exports = model("comment", commentSchema, "comments");
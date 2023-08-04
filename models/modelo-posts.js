const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    genre: {
        type: String
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

postSchema.pre('save', function (next) {
    // Restar 6 horas a la fecha actual
    this.date.setHours(this.date.getHours() - 6);
    next();
});

module.exports = model("post", postSchema, "posts");
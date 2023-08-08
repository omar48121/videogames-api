const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        default: 0,
    },
    totalRatings: {
        type: Number,
        default: 0
    }
});

module.exports = model("videogame", gameSchema, "videogames");
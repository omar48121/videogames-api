const { Schema, model } = require('mongoose');

const modeloResena = new Schema({
    userEmail: {
        type: String,
        required: true
    },
    gameDate: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = model("resena", modeloResena, "resenas");
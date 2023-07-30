const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    namegame:{
        type: String,
        required: true
    },
    GeneroGame:{
        type: String,
        required: true
    },
    imgame:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },
    calificacion:{
        type:Number,
        required: true,

    }
});

module.exports = model("videogame", gameSchema,"videogames");
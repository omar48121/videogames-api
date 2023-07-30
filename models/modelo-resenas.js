const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    user:{
        type: String,
        required: true
    },
    resena:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    juegoid:{
        type:String,
        required:true,
        

    }
});

module.exports = model("resena", gameSchema,"resenas");
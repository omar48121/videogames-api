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


/*En un proyecto de Node.js, los "models" (modelos) desempeñan un papel fundamental en la arquitectura de la aplicación
 Los modelos representan la capa de datos de la aplicación y se utilizan para interactuar con la base de datos o cualquier otro origen de datos subyacente.  */
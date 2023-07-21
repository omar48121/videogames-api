const mongoose = require("mongoose");

const conexion = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/videogames-api");
        console.log("Conexión correcta");
    } catch (error) {
        console.log(`No se pudo conectar a la base de datos: ${error}`);
    }
}

module.exports = conexion;
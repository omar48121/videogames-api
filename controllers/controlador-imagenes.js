const uploadImage = (req, res) => {
    // La imagen se ha cargado y almacenado en la carpeta "postImages" del servidor
    // Puedes acceder a la imagen a través de req.file.path y manejarla como desees (por ejemplo, copiarla a otro directorio, guardar el enlace en una base de datos, etc.).
    console.log(req.file.path);
    // Envía una respuesta al cliente (Android) para informar el éxito de la carga
    res.status(200).json({ message: 'Imagen cargada con éxito' });
}


module.exports = { uploadImage };
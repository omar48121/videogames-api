const { Router } = require("express");
const { uploadImage } = require("../controllers/controlador-imagenes");

const router = Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "postImages/",
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage: storage });

router.post("/", upload.single('image'), uploadImage);

module.exports = router;


// Importamos el enrutador de Express y el controlador de imágenes 
// Creamos una instancia del enrutador 
// Importamos el middleware multer para manejar la carga de imágenes 
// Importamos el middleware multer para manejar la carga de imágenes
// Configuración de almacenamiento personalizado para las imágenes

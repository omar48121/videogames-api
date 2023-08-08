const { Router } = require("express");
const { getAll, create, findById, rateGame } = require("../controllers/controlador-videogames");

const router = Router();
router.get("/", getAll);
router.post("/findById", findById);
router.post("/rate", rateGame);
router.post("/", create);
module.exports = router;


// Importamos el enrutador de Express y los controladores para la gestión de videojuegos
// Creamos una instancia del enrutador
// Definimos las rutas y los controladores correspondientes para la gestión de videojuegos
// Ruta GET para obtener todos los videojuegos
// Ruta POST para buscar un videojuego por su ID

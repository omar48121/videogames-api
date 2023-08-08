const { Router } = require("express");
const { } = require("../controllers/controlador-resena");
const { getAll, create,edit,deleteresena } = require("../controllers/controlador-resena");

const router = Router();
router.get("/",getAll)
router.post("/", create);
router.put("/",edit);
router.delete("/",deleteresena);
module.exports = router;


// Importamos el enrutador de Express y los controladores para la gestión de reseñas
// Creamos una instancia del enrutador
// Definimos las rutas y los controladores correspondientes para la gestión de reseñas
// Ruta GET para obtener todas las reseñas
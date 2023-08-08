const { Router } = require("express");
const { create, getAll, edit, remove } = require("../controllers/controlador-posts");
const { increaseCounter, decreaseCounter } = require("../controllers/controlador-likes");

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.put("/", edit);
router.post("/remove", remove);
router.post("/like", increaseCounter);
router.post("/dislike", decreaseCounter);

module.exports = router;


// Importamos el enrutador de Express y los controladores para la gestión de posts y likes
// Creamos una instancia del enrutador
// Definimos las rutas y los controladores correspondientes
// Ruta GET para obtener todos los posts
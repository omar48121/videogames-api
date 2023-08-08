const { Router } = require("express");
const { getAll, create, authenticateUser, findByEmail, getFullName } = require("../controllers/controlador-users");

const router = Router();

router.get("/", getAll);
router.post("/getFullName", getFullName);
router.post("/register", create);
router.post("/login", authenticateUser);
router.post("/search", findByEmail);

module.exports = router;


// Importamos el enrutador de Express y los controladores para la gestión de usuarios
// Creamos una instancia del enrutador
// Definimos las rutas y los controladores correspondientes para la gestión de usuarios
// Ruta GET para obtener todos los usuarios
// Ruta POST para obtener el nombre completo de un usuario

const { Router } = require("express");
const { } = require("../controllers/controlador-videogames");
const { getAll, create, } = require("../controllers/controlador-videogames");

const router = Router();
router.get("/",getAll)
router.post("/", create);
module.exports = router;
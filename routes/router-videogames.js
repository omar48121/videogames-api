const { Router } = require("express");
const { getAll, create, findById, rateGame } = require("../controllers/controlador-videogames");

const router = Router();
router.get("/", getAll);
router.post("/findById", findById);
router.post("/rate", rateGame);
router.post("/", create);
module.exports = router;
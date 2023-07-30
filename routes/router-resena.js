const { Router } = require("express");
const { } = require("../controllers/controlador-resena");
const { getAll, create,edit,deleteresena } = require("../controllers/controlador-resena");

const router = Router();
router.get("/",getAll)
router.post("/", create);
router.put("/",edit);
router.delete("/",deleteresena);
module.exports = router;
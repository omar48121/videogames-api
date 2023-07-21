const { Router } = require("express");
const { create, getAll, edit, remove } = require("../controllers/controlador-comments");

const router = Router();

router.get("/", getAll);
router.post("/", create);
// editar comentario
// router.put("", edit);

// eliminar comentario
// router.delete("", remove);

module.exports = router;

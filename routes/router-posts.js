const { Router } = require("express");
const { create, getAll, edit, remove } = require("../controllers/controlador-posts");

const router = Router();

router.get("/", getAll);
router.post("/", create);
// editar post
// router.put("", edit);

// eliminar post
// router.delete("", remove);

module.exports = router;

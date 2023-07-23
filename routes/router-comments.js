const { Router } = require("express");
const { create, getAll,editcomments,deletecomment } = require("../controllers/controlador-comments");

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.put("/",editcomments);
router.delete("/",deletecomment);

// editar comentario
// router.put("", edit);

// eliminar comentario
// router.delete("", remove);

module.exports = router;

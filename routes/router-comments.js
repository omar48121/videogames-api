const { Router } = require("express");
const { create, getAll, editComment, deleteComment } = require("../controllers/controlador-comments");

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.put("/",editComment);
router.delete("/",deleteComment);

module.exports = router;

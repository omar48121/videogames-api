const { Router } = require("express");
const { create, getAll, editComment, deleteComment, findByDate } = require("../controllers/controlador-comments");

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.post("/search", findByDate);
router.put("/",editComment);
router.delete("/",deleteComment);

module.exports = router;

const { Router } = require("express");
const { create, getAll, edit, remove } = require("../controllers/controlador-posts");
const { increaseCounter, decreaseCounter } = require("../controllers/controlador-likes");

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.post("/like", increaseCounter);
router.post("/dislike", decreaseCounter);

module.exports = router;

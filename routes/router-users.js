const { Router } = require("express");
const { getAll, create, authenticateUser } = require("../controllers/controlador-users");

const router = Router();

router.get("/", getAll);
router.post("/register", create);
router.post("/login", authenticateUser);

module.exports = router;

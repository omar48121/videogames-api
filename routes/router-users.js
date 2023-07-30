const { Router } = require("express");
const { getAll, create, authenticateUser, findByEmail } = require("../controllers/controlador-users");

const router = Router();

router.get("/", getAll);
router.post("/register", create);
router.post("/login", authenticateUser);
router.post("/search", findByEmail);

module.exports = router;

const { Router } = require("express");
const { uploadImage } = require("../controllers/controlador-imagenes");

const router = Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "postImages/",
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage: storage });

router.post("/", upload.single('image'), uploadImage);

module.exports = router;
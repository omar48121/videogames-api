const { Router } = require("express");
const { create, getAll, editComment, deleteComment, findByDate } = require("../controllers/controlador-comments");

const router = Router();


router.get("/", getAll);
router.post("/", create);
router.post("/search", findByDate);
router.put("/",editComment);
router.delete("/",deleteComment);



module.exports = router;


/*En un proyecto de Node.js utilizando el framework Express, 
los routers desempeñan un papel esencial en la organización y estructuración de las rutas y las acciones dentro de una aplicación web. 
Los routers permiten agrupar endpoints relacionados en un módulo separado, lo que mejora la modularidad y la legibilidad del código.  */

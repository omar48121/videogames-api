const express = require("express");
const conexion = require("./connection/connection");
const cors = require("cors");
const routerPosts = require("./routes/router-posts");
const routerUsers = require("./routes/router-users");
const routerComments = require("./routes/router-comments");
const routerImages = require("./routes/router-images");
const routervideogames = require("./routes/router-videogames");
const routerResena = require("./routes/router-resena");
/*Te permite cargar módulos y archivos en tu aplicación Node.js para que puedas acceder a sus funcionalidades y variables. */

process.env.TZ = 'America/Mexico_City';
const app = express();
conexion();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static('postImages'));

app.use("/posts", routerPosts);
app.use("/users", routerUsers);
app.use("/comments", routerComments);
app.use("/images", routerImages);
app.use("/videogames", routervideogames);
app.use("/resenas",routerResena);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

/*app.listen(3000, () => {
    console.log("Server is running on port 3000"); 
    se utiliza para iniciar el servidor y escuchar las solicitudes entrantes en un 
puerto específico en una aplicación Express. */




/* app.use("/posts", routerPosts);
En Node.js, para definir rutas de manejo de solicitudes en una aplicación web. 
Permite especificar un middleware (en este caso, un router) 
que se aplicará a las solicitudes que coincidan con la ruta dada. */
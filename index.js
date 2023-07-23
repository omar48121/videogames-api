const express = require("express");
const conexion = require("./connection/connection");
const cors = require("cors");
const routerPosts = require("./routes/router-posts");
const routerUsers = require("./routes/router-users");
const routerComments = require("./routes/router-comments");

const app = express();
conexion();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/posts", routerPosts);
app.use("/users", routerUsers);
app.use("/comments", routerComments);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
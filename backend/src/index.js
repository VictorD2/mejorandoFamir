const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const passport = require("passport");
const { database } = require("./keys");
const llaves = require("./config");
//Initialization
const app = express();
require("./lib/passport");

//Settings
app.set("port", process.env.PORT || 4000);

// Middleware
app.use(
  session({
    /*Guarda la session en la BD*/ secret: "famir_session",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);

app.use(express.json()); /* El servidor accepta json */
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: llaves.API, //Asi el frontend puede hacer peticiones
    credentials: true,
  })
);
app.use(passport.initialize()); /* Inicializa passport */
app.use(passport.session({ cookie: { maxAge: 3600 } }));

//Public
app.use(express.static(path.join(__dirname, "/build")));

// Global Variables
app.use(async (req, res, next) => {
  // console.log(req.user);
  app.locals.user = req.user;
  next();
});

//Routes
app.use("/api/v0/pais", require("./routes/pais.routes"));
app.use("/api/v0/tareasMaterial", require("./routes/tarea_material.routes"));
app.use("/api/v0/tareas", require("./routes/tareas.routes"));
app.use("/api/v0/contacto", require("./routes/contacto.routes"));
app.use("/api/v0/usuariocurso", require("./routes/usuariocurso.routes"));
app.use("/api/v0/comprobante", require("./routes/comprobantes.routes"));
app.use("/api/v0/material", require("./routes/material.routes"));
app.use("/api/v0/comentarios", require("./routes/comentarios.routes"));
app.use("/api/v0/tema", require("./routes/tema.routes"));
app.use("/api/v0/modulos", require("./routes/modulos.routes"));
app.use("/api/v0/cursos", require("./routes/cursos.routes"));
app.use("/api/v0/profesores", require("./routes/profesores.routes"));
app.use("/api/v0/usuarios", require("./routes/usuarios.routes"));
app.use("/api/v0/estudiantes", require("./routes/estudiantes.routes"));
app.use(require("./routes/auth.routes"));
app.use(require("./routes/index.routes")); //<- siempre al ultimo

//Starting the server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

const router = require("express").Router();
const ctrlComentarios = require("../controllers/comentarios.controllers");
const { isLoggedInApi } = require("../lib/auth");

router.get("/:idCurso/:idTema", [isLoggedInApi], ctrlComentarios.getComentarios);
router.get("/count/:idCurso/:idTema", ctrlComentarios.getCount);
router.post("/:idCurso/:idTema", [isLoggedInApi], ctrlComentarios.createComentario);
router.delete("/:id", [isLoggedInApi], ctrlComentarios.deleteComentario);

module.exports = router;

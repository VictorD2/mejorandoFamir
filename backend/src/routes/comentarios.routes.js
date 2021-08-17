const router = require("express").Router();
const ctrlComentarios = require("../controllers/comentarios.controllers");
const { isAdmin, typePetition } = require("../lib/auth");

router.get("/:idCurso/:idTema", ctrlComentarios.getComentarios);
router.get("/count/:idCurso/:idTema", ctrlComentarios.getCount);
router.post("/:idCurso/:idTema", ctrlComentarios.createComentario);
router.delete("/:id", ctrlComentarios.deleteComentario);

module.exports = router;

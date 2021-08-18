const router = require("express").Router();
const ctrlusuariocurso = require("../controllers/usuariocurso.controllers");
const { isAdmin } = require("../lib/auth");

router.get("/estudiante/:idEstudiante", ctrlusuariocurso.getUsuariocursoByIdEstudiante);
router.get("/curso/:idCurso", ctrlusuariocurso.getUsuariocursoByIdCurso);
router.get("/count/estudiante/:id", ctrlusuariocurso.getCountUsuarioCursoByCursoId);
router.post("/", ctrlusuariocurso.createUsuariocurso);
router.put("/:idCurso/:idUsuario", ctrlusuariocurso.setFavorito);
// router.delete("/:id", ctrlusuariocurso.deleteUsuariocurso);

module.exports = router;

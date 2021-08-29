const router = require("express").Router();
const ctrlusuariocurso = require("../controllers/usuariocurso.controllers");
const { isAdminApi } = require("../lib/auth");

router.get("/estudiante/:idEstudiante", ctrlusuariocurso.getUsuariocursoByIdEstudiante);
router.get("/curso/:idCurso", [isAdminApi], ctrlusuariocurso.getUsuariocursoByIdCurso);
router.get("/count/estudiante/:id", ctrlusuariocurso.getCountUsuarioCursoByCursoId);
router.post("/", [isAdminApi], ctrlusuariocurso.createUsuariocurso);
router.put("/:idCurso/:idUsuario", ctrlusuariocurso.setFavorito);
// router.delete("/:id", ctrlusuariocurso.deleteUsuariocurso);

module.exports = router;

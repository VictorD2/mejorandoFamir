const router = require("express").Router();
const ctrlProfesores = require("../controllers/profesores.controllers");
const { isAdmin, isLoggedIn } = require("../lib/auth");

router.get("/", ctrlProfesores.getProfesores);
router.get("/count", ctrlProfesores.getCount);
router.get("/:id", ctrlProfesores.getProfesorById);
router.post("/", ctrlProfesores.createProfesor);
router.put("/:id", ctrlProfesores.updateProfesor);
router.delete("/:id", ctrlProfesores.deleteProfesor);

module.exports = router;

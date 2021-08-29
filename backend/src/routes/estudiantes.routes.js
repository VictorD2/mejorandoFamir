const router = require("express").Router();
const ctrlEstudiantes = require("../controllers/estudiantes.controllers");
const { isAdminApi } = require("../lib/auth");

router.get("/", [isAdminApi], ctrlEstudiantes.getEstudiantes);
router.get("/count", ctrlEstudiantes.getCount);
router.get("/:id", [isAdminApi], ctrlEstudiantes.getEstudianteById);
router.delete("/:id", [isAdminApi], ctrlEstudiantes.deleteEstudiante);
// router.post('/', ctrlEstudiantes.createUser);
// router.put('/:id', ctrlEstudiantes.updateUser);

module.exports = router;

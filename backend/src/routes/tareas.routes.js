const router = require("express").Router();
const ctrlTarea = require("../controllers/tareas.controllers");
const { isAdminApi } = require("../lib/auth");

router.get("/single/:id", ctrlTarea.getTareaById);
router.get("/:id", ctrlTarea.getTareasByModuloId);
router.post("/", [isAdminApi], ctrlTarea.createTarea);
router.delete("/:id", [isAdminApi], ctrlTarea.eliminarTarea);
router.put("/", [isAdminApi], ctrlTarea.actualizarTarea);

module.exports = router;

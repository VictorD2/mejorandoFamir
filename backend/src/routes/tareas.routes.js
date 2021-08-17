const router = require("express").Router();
const ctrlTarea = require("../controllers/tareas.controllers");

router.get("/single/:id", ctrlTarea.getTareaById);
router.get("/:id", ctrlTarea.getTareasByModuloId);
router.post("/", ctrlTarea.createTarea);
router.delete("/:id", ctrlTarea.eliminarTarea);
router.put("/", ctrlTarea.actualizarTarea);

module.exports = router;

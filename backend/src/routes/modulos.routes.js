const router = require("express").Router();
const ctrlModulo = require("../controllers/modulos.controllers");
const { isAdminApi } = require("../lib/auth");

router.get("/:id", ctrlModulo.getModuloByCursoId);
router.post("/", [isAdminApi], ctrlModulo.createModulo);
router.delete("/:id", [isAdminApi], ctrlModulo.eliminarModulo);
router.put("/", [isAdminApi], ctrlModulo.actualizarModulo);

module.exports = router;

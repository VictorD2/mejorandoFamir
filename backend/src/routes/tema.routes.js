const router = require("express").Router();
const ctrlTema = require("../controllers/tema.controllers");
const { isAdminApi } = require("../lib/auth");

router.get("/:id", ctrlTema.getTemaByModuloId);
router.get("/idTema/:id", ctrlTema.getTemaById);
router.post("/", [isAdminApi], ctrlTema.createTema);
router.put("/:id", [isAdminApi], ctrlTema.actualizarTema);
router.delete("/:id", [isAdminApi], ctrlTema.eliminarTema);

module.exports = router;

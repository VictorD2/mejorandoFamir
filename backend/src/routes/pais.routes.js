const router = require("express").Router();
const ctrlPais = require("../controllers/pais.controllers");

router.get("/", ctrlPais.getPaises);
router.get("/:idPais", ctrlPais.getPais);

module.exports = router;
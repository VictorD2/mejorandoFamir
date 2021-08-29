const router = require("express").Router();
const ctrlContacto = require("../controllers/contacto.controllers");
const { isAdminApi } = require("../lib/auth");

router.get("/", [isAdminApi], ctrlContacto.getContactos);
router.get("/count", ctrlContacto.getCount);
router.get("/:id", [isAdminApi], ctrlContacto.getContactoById);
router.post("/", ctrlContacto.createContacto);
// router.put('/:id', ctrlContacto.updateUser);
router.delete("/:id", [isAdminApi], ctrlContacto.deleteContacto);

module.exports = router;

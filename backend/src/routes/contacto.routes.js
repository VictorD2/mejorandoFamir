const router = require("express").Router();
const ctrlContacto = require("../controllers/contacto.controllers");

router.get("/", ctrlContacto.getContactos);
router.get("/count", ctrlContacto.getCount);
router.get("/:id", ctrlContacto.getContactoById);
router.post("/", ctrlContacto.createContacto);
// router.put('/:id', ctrlContacto.updateUser);
router.delete("/:id", ctrlContacto.deleteContacto);

module.exports = router;

const router = require("express").Router();
const ctrlServicios = require("../controllers/servicios.controllers");

router.get("/", ctrlServicios.getUsers);
router.get("/:id", ctrlServicios.getUserById);
router.post("/", ctrlServicios.createUser);
router.put("/:id", ctrlServicios.updateUser);
router.delete("/:id", ctrlServicios.deleteUser);

module.exports = router;

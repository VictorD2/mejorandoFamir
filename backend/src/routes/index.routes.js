const router = require("express").Router();
const path = require("path");
const ctrlIndex = require("../controllers/index.controllers");
const { isAdmin, isNotLoggedIn, isLoggedIn } = require("../lib/auth");

router.get("/Dashboard/", [isLoggedIn, isAdmin], ctrlIndex.index);
router.get("/Dashboard/*", [isLoggedIn, isAdmin], ctrlIndex.index);
router.get("/Perfil", [isLoggedIn], ctrlIndex.index);
router.get("/Perfil/*", [isLoggedIn], ctrlIndex.index);
router.get("/Iniciar", [isNotLoggedIn], ctrlIndex.index);
router.get("/Registrarse", [isNotLoggedIn], ctrlIndex.index);
router.get("/*", ctrlIndex.index);

module.exports = router;

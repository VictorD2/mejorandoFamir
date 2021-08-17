const router = require("express").Router();
const path = require("path");
const { isAdmin, isNotLoggedIn, isLoggedIn } = require("../lib/auth");

router.get("/Dashboard/", [isLoggedIn, isAdmin], (req, res) => {
  return res.sendFile(path.join(__dirname, "../build", "index.html"));
});
router.get("/Dashboard/*", [isLoggedIn, isAdmin], (req, res) => {
  return res.sendFile(path.join(__dirname, "../build", "index.html"));
});
router.get("/Perfil", [isLoggedIn], (req, res) => {
  return res.sendFile(path.join(__dirname, "../build", "index.html"));
});
router.get("/Perfil/*", [isLoggedIn], (req, res) => {
  return res.sendFile(path.join(__dirname, "../build", "index.html"));
});
router.get("/Iniciar", [isNotLoggedIn], (req, res) => {
  return res.sendFile(path.join(__dirname, "../build", "index.html"));
});
router.get("/Registrarse", [isNotLoggedIn], (req, res) => {
  return res.sendFile(path.join(__dirname, "../build", "index.html"));
});
router.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "../build", "index.html"));
});

module.exports = router;

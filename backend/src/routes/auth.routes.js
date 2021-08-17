const router = require("express").Router();
const passport = require("passport");
const pool = require("../database");
const { isAdmin } = require("../lib/auth");

//Registrarse
router.post("/signup", async (req, res, next) => {
  passport.authenticate("local.signup", {
    successRedirect: "/sucessfulRegister",
    failureRedirect: "/failedLogin",
  })(req, res, next);
});

//Iniciar Session
router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", function (err, user, info) {

    if (err) return res.json({ error: err });

    if (!user) return res.redirect("/failedLogin");

    req.logIn(user, function (err) {
      if (err) return res.json(err);
      user.authenticate = true;
      return res.json({ success: "Sesión Iniciada", user: user });
    });
    
  })(req, res, next);
});
router.get("/sucessfulRegister",async (req, res) => {
  if (!req.user) return res.json({ error: "Ocurrió un error" });
  req.user.authenticate = true;
  return res.json({ success: "Sesión Iniciada", user: req.user });
});

router.get("/sucessfulLogin", async (req, res) => {
  if (!req.user) return res.json({ error: "Contraseña o Correo inválidos" }); //No autentificado
  delete req.user.Contrasenia;
  req.user.authenticate = true;
  return res.json({ success: "Sesión Iniciada", user: req.user });
});

router.get("/failedLogin", async (req, res) => {
  return res.json({ error: "Contraseña o Correo inválidos" }); //No autentificado
});

//Iniciar con Google
router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
router.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/Iniciar" }));

//Desconectarse
router.get("/logout", (req, res) => {
  req.logOut();
  res.json({ success: "Desconectado" });
});

module.exports = router;

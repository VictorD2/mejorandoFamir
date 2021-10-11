module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/Iniciar");
  },

  isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/");
  },

  isAdmin(req, res, next) {
    if (req.user.id_rango != 1) return res.redirect("/");
    return next();
  },

  isAdminApi(req, res, next) {
    try {
      // if (!req.user) return res.json({ error: "Necesitas una cuenta para esta acción" });
      // if (req.user.id_rango != "1") return res.json({ error: "No tienes permiso para esta acción" });
      return next();
    } catch (error) {
      console.log(error);
      return res.json({ error: "Ocurrió un error" });
    }
  },
  
  isLoggedInApi(req, res, next) {
    try {
      // if (!req.user) return res.json({ error: "Necesitas una cuenta para esta acción" });
      return next();
    } catch (error) {
      console.log(error);
      return res.json({ error: "Ocurrió un error" });
    }
  },
};

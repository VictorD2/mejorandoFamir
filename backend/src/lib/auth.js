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
};

const pool = require("../database");
const ctrlUsuarios = {};
const helpers = require("../lib/helpers");
const fs = require("fs-extra");
const path = require("path");

//.get('/whoami')
ctrlUsuarios.whoiam = async (req, res) => {
  try {
    if (!req.user) return res.json({ error: "No autentificado" }); //No autentificado
    return res.json({ user: req.user });
  } catch (error) {
    console.log(error);
    return res.json({ error: "No autentificado" }); //No autentificado
  }
};

//.put('/:id')
ctrlUsuarios.updateUserDatos = async (req, res) => {
  try {
    if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });
    const { id_usuario, nombre, apellido, correo, telefono, rut, habilitado_u, profesion, url_foto_usuario, id_rango, id_pais_nacimiento, id_pais_residencia } = req.body;
    const newUsuario = { id_usuario, nombre, apellido, correo, telefono, rut, habilitado_u, profesion, url_foto_usuario, id_rango, id_pais_nacimiento, id_pais_residencia };
    const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newUsuario, req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Perfil modificado correctamente", usuario: req.body }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ya existe un usuario con ese correo" });
    return res.json({ error: "Ocurrió un error" });
  }
};

//.put('/password/:id')
ctrlUsuarios.updatePassword = async (req, res) => {
  try {
    if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });

    const usuario = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
    if (usuario[0].password != "") {
      const validarPassword = await helpers.matchPassword(req.body.oldPassword, usuario[0].password);
      if (!validarPassword) return res.json({ error: "Contraseña anterior incorrecta" });
    }
    const newPassword = await helpers.encrypPassword(req.body.newPassword);
    const newUsuario = { password: newPassword };
    const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newUsuario, req.params.id]);

    if (rows.affectedRows === 1) return res.json({ success: "Contraseña modificada correctamente" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.put('/img/:id')
ctrlUsuarios.updateImg = async (req, res) => {
  try {
    if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });
    const usuario = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);

    if (usuario[0].url_foto_usuario.search(`/uploads/fotosPerfil`) != -1) {
      await fs.unlink(path.join(__dirname, "../build" + usuario[0].url_foto_usuario));
    }
    const newUsuario = { url_foto_usuario: `/uploads/fotosPerfil/${req.file.filename}` };
    const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newUsuario, req.params.id]);

    if (rows.affectedRows === 1) return res.json({ success: "Foto modificada correctamente", url_foto_usuario: newUsuario.url_foto_usuario }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlUsuarios;

const pool = require("../database");
const ctrlUsuarios = {};
const helpers = require("../lib/helpers");
const fs = require("fs-extra");
const path = require("path");

// //.post('/')
// ctrlUsuarios.createUser = (req, res) => {};

// ctrlUsuarios.getUsers = async(req, res) => {
//     const data = await pool.query('SELECT * FROM usuarios');
//     res.json(data);
// }

//.get('/:id')
// ctrlUsuarios.getUserById = (req, res) => {};

//.get('/whoami')
ctrlUsuarios.whoiam = async (req, res) => {
  if (!req.user) return res.json({ error: "No autentificado" }); //No autentificado
  let datosSQL = `id_usuario,nombre,apellido,correo,telefono,rut,habilitado_u,profesion,url_foto_usuario, id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
  let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;

  const usuario = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_usuario = ? `, [req.user.id_usuario]);
  usuario[0].authenticate = true;
  return res.json({ user: usuario[0] });
};

//.put('/:id')
ctrlUsuarios.updateUserDatos = async (req, res) => {
  if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });
  const { id_usuario, nombre, apellido, correo, telefono, rut, habilitado_u, profesion, url_foto_usuario, id_rango, id_pais_nacimiento, id_pais_residencia } = req.body;
  const newUsuario = {
    id_usuario,
    nombre,
    apellido,
    correo,
    telefono,
    rut,
    habilitado_u,
    profesion,
    url_foto_usuario,
    id_rango,
    id_pais_nacimiento,
    id_pais_residencia,
  };
  try {
    const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newUsuario, req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Perfil modificado correctamente", usuario: req.body }); //Se logró registrar
  } catch (error) {
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ya existe un usuario con ese correo" });
  }

  return res.json({ error: "Ocurrió un error" });
};

//.put('/password/:id')
ctrlUsuarios.updatePassword = async (req, res) => {
  if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });

  const usuario = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
  if (usuario[0].password != "") {
    const validarPassword = await helpers.matchPassword(req.body.oldPassword, usuario[0].password);
    if (!validarPassword) return res.json({ error: "Contraseña anterior incorrecta" });
  }
  const newPassword = await helpers.encrypPassword(req.body.newPassword);
  const newUsuario = {
    password: newPassword,
  };
  const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newUsuario, req.params.id]);

  if (rows.affectedRows === 1) return res.json({ success: "Contraseña modificada correctamente" }); //Se logró registrar

  return res.json({ error: "Ocurrió un error" });
};

//.put('/img/:id')
ctrlUsuarios.updateImg = async (req, res) => {
  if (req.params.id != req.user.id_usuario) return res.json({ error: "No tienes permiso para esta acción" });
  const usuario = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);

  if (usuario[0].url_foto_usuario.search(`/uploads/fotosPerfil`) != -1) {
    await fs.unlink(path.join(__dirname, "../build" + usuario[0].url_foto_usuario));
  }
  const newUsuario = { url_foto_usuario: `/uploads/fotosPerfil/${req.file.filename}` };
  const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newUsuario, req.params.id]);

  if (rows.affectedRows === 1) return res.json({ success: "Foto modificada correctamente", url_foto_usuario: newUsuario.url_foto_usuario }); //Se logró registrar

  return res.json({ error: "Ocurrió un error" });
};

// ctrlUsuarios.deleteUser = (req, res) => {}

module.exports = ctrlUsuarios;

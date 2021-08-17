const { closeSync } = require("fs");
const pool = require("../database");
const ctrlProfesores = {};
const helpers = require("../lib/helpers");

//.get("/")
ctrlProfesores.getProfesores = async (req, res) => {
  let datosSQL = `id_usuario,nombre,apellido,profesion,correo,telefono,rut,habilitado_u,url_foto_usuario, id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
  let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;

  if (req.query.keyword && req.query.page) {
    const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '3' AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')  ORDER BY id_usuario DESC`);
    const cantidadDatos = 12;
    const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
    return res.json(data.splice(pagina, cantidadDatos));
  }
  if (req.query.keyword) {
    const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} id_rango = '3' AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')  ORDER BY id_usuario DESC`);
    return res.json(data);
  }
  if (req.query.page) {
    const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '3'  ORDER BY id_usuario DESC`);
    const cantidadDatos = 12;
    const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
    return res.json(data.splice(pagina, cantidadDatos));
  }
  const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '3'  ORDER BY id_usuario DESC`);
  return res.json(data);
};

//.get("/count")
ctrlProfesores.getCount = async (req, res) => {
  if (req.query.keyword) {
    const rows = await pool.query(`SELECT COUNT(*) FROM usuario WHERE id_rango = 3 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')`);
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
    return res.json(0);
  }
  const rows = await pool.query(`SELECT COUNT(*) FROM usuario WHERE id_rango = 3`);
  if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
  return res.json({ error: "Ocurrió un error" });
};

//.get("/:id")
ctrlProfesores.getProfesorById = async (req, res) => {
  // if (!req.user) return res.json({ error: "Necesitas una cuenta" });
  // if (req.user.id_rango === 2) {
  //   let datosSQL = `id_usuario,nombre,apellido,url_foto_usuario`;
  //   const rows = await pool.query(`SELECT ${datosSQL} FROM usuario WHERE id_usuario = ? ORDER BY id_usuario DESC`, [req.params.id]);
  //   if (rows.length === 0) return res.json({ error: "No existe al profesor" });
  //   return res.json(rows[0]);
  // }
  let datosSQL = `id_usuario,nombre,apellido,profesion,correo,telefono,rut,habilitado_u,url_foto_usuario, id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
  let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;

  const rows = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_usuario = ? ORDER BY id_usuario DESC`, [req.params.id]);

  if (rows.length === 0) return res.json({ error: "No existe al profesor" });

  return res.json(rows[0]);
};

//.post("/")
ctrlProfesores.createProfesor = async (req, res) => {
  const newProfesor = req.body;
  newProfesor.id_rango = 3;
  newProfesor.habilitado_u = 1;
  newProfesor.url_foto_usuario = "/defaultProfile.PNG";
  newProfesor.password = newProfesor.rut;
  newProfesor.password = await helpers.encrypPassword(newProfesor.password);
  console.log(newProfesor);

  try {
    const rows = await pool.query("INSERT INTO usuario set ?", [newProfesor]);

    if (rows.affectedRows === 1) return res.json({ success: "Profesor creado" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ese correo ya está registrado" });
  }
};

//.put("/:id")
ctrlProfesores.updateProfesor = async (req, res) => {
  const newProfesor = req.body;
  delete newProfesor.nombre_pais_nacimiento;
  delete newProfesor.nombre_pais_residencia;
  delete newProfesor.url_foto_nacimiento;
  delete newProfesor.url_foto_residencia;
  try {
    const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newProfesor, req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Profesor actualizado" }); //Se logró actualizar

    res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ese correo ya está registrado" });
  }
};

//.delete("/:id")
ctrlProfesores.deleteProfesor = async (req, res) => {
  const rows = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
  rows[0].habilitado_u == 0 ? (rows[0].habilitado_u = 1) : (rows[0].habilitado_u = 0);
  const data = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [rows[0], req.params.id]);

  if (data.affectedRows === 1) return res.json({ success: `Estado del profesor ${rows[0].nombre} actualizado` }); //Se logró actualizar

  res.json({ error: "Ocurrió un error" });
};

module.exports = ctrlProfesores;

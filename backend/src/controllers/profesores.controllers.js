const pool = require("../database");
const ctrlProfesores = {};
const helpers = require("../lib/helpers");
const fs = require("fs-extra");
const path = require("path");
//.get("/")
ctrlProfesores.getProfesores = async (req, res) => {
  try {
    let datosSQL = `id_usuario,nombre,apellido,profesion,correo,telefono,rut,habilitado_u,url_foto_usuario, id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
    let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;

    if (req.query.keyword && req.query.page) {
      const cantidadDatos = 12;
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '3' AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')  ORDER BY id_usuario DESC  LIMIT ${cantidadDatos * req.query.page}`);
      return res.json({ success: "Datos obtenidos", profesores: data.splice(pagina, cantidadDatos) });
    }
    if (req.query.keyword) {
      const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} id_rango = '3' AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')  ORDER BY id_usuario DESC`);
      return res.json({ success: "Datos obtenidos", profesores: data });
    }
    if (req.query.page) {
      const cantidadDatos = 12;
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '3'  ORDER BY id_usuario DESC  LIMIT ${cantidadDatos * req.query.page}`);
      return res.json({ success: "Datos obtenidos", profesores: data.splice(pagina, cantidadDatos) });
    }
    const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '3'  ORDER BY id_usuario DESC`);
    return res.json({ success: "Datos obtenidos", profesores: data });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurri?? un error" });
  }
};

//.get("/public")
ctrlProfesores.getProfesoresPublic = async (req, res) => {
  try {
    const profesores = await pool.query("SELECT nombre,apellido,profesion,url_foto_profesor FROM usuario WHERE id_rango = 3");
    return res.json({ success: "Datos obtenidos", profesores: profesores });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurri?? un error" });
  }
};

//.get("/count")
ctrlProfesores.getCount = async (req, res) => {
  try {
    if (req.user.id_rango != "1") return res.json(0);

    if (req.query.keyword) {
      const rows = await pool.query(`SELECT COUNT(*) FROM usuario WHERE id_rango = 3 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')`);
      if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
      return res.json(0);
    }
    const rows = await pool.query(`SELECT COUNT(*) FROM usuario WHERE id_rango = 3`);
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
    return res.json(0);
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
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
  try {
    let datosSQL = `id_usuario,nombre,url_foto_profesor,apellido,profesion,correo,telefono,rut,habilitado_u,url_foto_usuario, id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
    let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;

    const rows = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_usuario = ? ORDER BY id_usuario DESC`, [req.params.id]);

    if (rows.length === 0) return res.json({ error: "No existe al profesor" });

    return res.json({ success: "Dato obtenido", profesor: rows[0] });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurri?? un error" });
  }
};

//.post("/")
ctrlProfesores.createProfesor = async (req, res) => {
  try {
    const newProfesor = req.body;
    newProfesor.id_rango = 3;
    newProfesor.habilitado_u = 1;
    newProfesor.url_foto_usuario = "/defaultProfile.PNG";
    newProfesor.password = newProfesor.rut;
    newProfesor.url_foto_profesor = `/uploads/fotosProfesores/${req.file.filename}`;
    newProfesor.password = await helpers.encrypPassword(newProfesor.password);
    const rows = await pool.query("INSERT INTO usuario set ?", [newProfesor]);

    if (rows.affectedRows === 1) return res.json({ success: "Profesor creado" }); //Se logr?? registrar

    return res.json({ error: "Ocurri?? un error" });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ese correo ya est?? registrado" });
    return res.json({ error: "Ocurri?? un error" });
  }
};

//.put("/:id")
ctrlProfesores.updateProfesor = async (req, res) => {
  try {
    const { nombre, apellido, telefono, rut, profesion, correo, id_pais_nacimiento, id_pais_residencia } = req.body;
    const newProfesor = { nombre, apellido, telefono, rut, profesion, correo, id_pais_nacimiento, id_pais_residencia };
    if (req.file) {
      newProfesor.url_foto_profesor = `/uploads/fotosProfesores/${req.file.filename}`;
      const profesor = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
      await fs.unlink(path.join(__dirname, "../build" + profesor[0].url_foto_profesor));
    }
    const rows = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [newProfesor, req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Profesor actualizado" }); //Se logr?? actualizar

    return res.json({ error: "Ocurri?? un error" });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ese correo ya est?? registrado" });
    return res.json({ error: "Ocurri?? un error" });
  }
};

//.delete("/:id")
ctrlProfesores.deleteProfesor = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
    rows[0].habilitado_u == 0 ? (rows[0].habilitado_u = 1) : (rows[0].habilitado_u = 0);
    const data = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [rows[0], req.params.id]);

    if (data.affectedRows === 1) return res.json({ success: `Estado del profesor ${rows[0].nombre} actualizado` }); //Se logr?? actualizar

    return res.json({ error: "Ocurri?? un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurri?? un error" });
  }
};

module.exports = ctrlProfesores;

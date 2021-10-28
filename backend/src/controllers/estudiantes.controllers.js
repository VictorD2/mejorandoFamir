const pool = require("../database");
const ctrlEstudiantes = {};

//.get("/")
ctrlEstudiantes.getEstudiantes = async (req, res) => {
  try {
    let datosSQL = `id_usuario,nombre,apellido,correo,telefono,rut,habilitado_u,url_foto_usuario,profesion , id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
    let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;

    if (req.query.keyword && req.query.page) {
      const cantidadDatos = 12;
      const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = 2 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%') ORDER BY id_usuario DESC LIMIT ${cantidadDatos * req.query.page}`);
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      return res.json({ success: "Datos obtenidos", estudiantes: data.splice(pagina, cantidadDatos) });
    }

    if (req.query.keyword) {
      const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = 2 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%') ORDER BY id_usuario DESC `);
      return res.json({ success: "Datos obtenidos", estudiantes: data });
    }

    if (req.query.page) {
      const cantidadDatos = 12;
      const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '2' ORDER BY id_usuario DESC LIMIT ${cantidadDatos * req.query.page}`);
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      return res.json({ success: "Datos obtenidos", estudiantes: data.splice(pagina, cantidadDatos) });
    }

    const data = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_rango = '2' ORDER BY id_usuario DESC`);
    return res.json({ success: "Datos obtenidos", estudiantes: data });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get("/count")
ctrlEstudiantes.getCount = async (req, res) => {
  try {
    if (req.user.id_rango != "1") return res.json(0);

    if (req.query.keyword) {
      const data = await pool.query(`SELECT COUNT(*) FROM usuario WHERE id_rango = 2 AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')`);
      if (data[0]["COUNT(*)"]) return res.json(data[0]["COUNT(*)"]);
      return res.json(0);
    }

    const rows = await pool.query("SELECT COUNT(*) FROM usuario WHERE id_rango = 2");

    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);

    return res.json(0);
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};

//.get("/:id")
ctrlEstudiantes.getEstudianteById = async (req, res) => {
  try {
    let datosSQL = `id_usuario,nombre,apellido,correo,telefono,rut,habilitado_u,url_foto_usuario,profesion, id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
    let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;
    const rows = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE id_usuario = ? ORDER BY id_usuario DESC`, [req.params.id]);
    if (rows.length === 0) return res.json({ error: "No existe tal estudiante" });
    return res.json({ success: "Dato obtenido", estudiante: rows[0] });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.delete("/:id")
ctrlEstudiantes.deleteEstudiante = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [req.params.id]);
    rows[0].habilitado_u == 0 ? (rows[0].habilitado_u = 1) : (rows[0].habilitado_u = 0);
    const data = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [rows[0], req.params.id]);

    if (data.affectedRows === 1) return res.json({ success: `Estado del estudiante ${rows[0].nombre} actualizado` }); //Se logró actualizar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlEstudiantes;

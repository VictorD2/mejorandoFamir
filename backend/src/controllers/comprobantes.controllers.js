const pool = require("../database");
const ctrlComprobantes = {};
const fs = require("fs-extra");
const path = require("path");

//.get('/count/:estado')
ctrlComprobantes.getCount = async (req, res) => {
  try {
    let Joins = `JOIN usuario ON comprobante.id_usuario = usuario.id_usuario JOIN curso ON curso.id_curso=comprobante.id_curso`;

    if (req.query.keyword) {
      const rows = await pool.query(`SELECT COUNT(*) FROM comprobante ${Joins} WHERE estado = ? AND (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%' OR nombre_curso LIKE '%${req.query.keyword}%')`, [req.params.estado]);
      if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
      return res.json(0);
    }
    const rows = await pool.query(`SELECT COUNT(*) FROM comprobante ${Joins} WHERE estado = ?`, [req.params.estado]);
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
    return res.json(0);
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};

//.get('/:estado/:page')
ctrlComprobantes.getComprobantes = async (req, res) => {
  try {
    let datosSQL = `id_comprobante,estado,usuario.id_usuario,nombre,apellido,nombre_curso,url_foto_comprobante`;
    let Joins = `JOIN usuario ON comprobante.id_usuario = usuario.id_usuario JOIN curso ON curso.id_curso=comprobante.id_curso`;
    if (req.query.keyword && req.params.page) {
      const cantidadDatos = 12;
      const pagina = (req.params.page - 1) * cantidadDatos;
      const rows = await pool.query(`SELECT ${datosSQL} FROM comprobante ${Joins} WHERE estado = ? AND  (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%' OR nombre_curso LIKE '%${req.query.keyword}%') ORDER BY fecha_enviado DESC LIMIT ${cantidadDatos * req.params.page}`, [req.params.estado]);
      return res.json({ success: "Datos obtenidos", comprobantes: rows.splice(pagina, cantidadDatos) });
    }
    if (req.query.keyword) {
      const rows = await pool.query(`SELECT ${datosSQL} FROM comprobante ${Joins} WHERE estado = ? AND  (nombre LIKE '%${req.query.keyword}%' OR apellido LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%' OR nombre_curso LIKE '%${req.query.keyword}%') ORDER BY fecha_enviado DESC`, [req.params.estado]);
      return res.json({ success: "Datos obtenidos", comprobantes: rows });
    }
    if (req.params.page) {
      const cantidadDatos = 12;
      const pagina = (req.params.page - 1) * cantidadDatos;
      const rows = await pool.query(`SELECT ${datosSQL} FROM comprobante ${Joins} WHERE estado = ? ORDER BY fecha_enviado DESC LIMIT ${cantidadDatos * req.params.page}`, [req.params.estado]);
      return res.json({ success: "Datos obtenidos", comprobantes: rows.splice(pagina, cantidadDatos) });
    }
    const rows = await pool.query(`SELECT ${datosSQL} FROM comprobante ${Joins} WHERE estado = ? ORDER BY fecha_enviado DESC`, [req.params.estado]);
    return res.json({ success: "Datos obtenidos", comprobantes: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get('/:id')
ctrlComprobantes.getComprobanteById = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM comprobante WHERE id_comprobante = ?", [req.params.id]);
    if (rows[0]) return res.json({ success: "Dato obtenido", comprobante: rows[0] });
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.post('/')
ctrlComprobantes.createComprobante = async (req, res) => {
  try {
    // Una cuenta
    if (!req.user) {
      await fs.unlink(path.join(__dirname,`../build/uploads/fotosComprobantes/${req.file.filename}`));
      return res.json({ error: "Necesita una cuenta para comprar" });
    }

    // Diferente usuario
    if (req.user.id_usuario != req.body.id_usuario) {
      await fs.unlink(path.join(__dirname,`../build/uploads/fotosComprobantes/${req.file.filename}`));
      return res.json({ error: "No tienes permiso para hacer eso" }); //Descomentar en producción
    }

    // No foto
    if (!req.file) {
      await fs.unlink(path.join(__dirname,`../build/uploads/fotosComprobantes/${req.file.filename}`));
      return res.json({ error: "No ha subido una foto" });
    }

    // Ya envió un comprobante
    const validacion = await pool.query('SELECT * FROM comprobante WHERE id_usuario = ? AND id_curso = ? AND estado = "NoVisto"', [req.body.id_usuario, req.body.id_curso]);
    if (validacion[0]) {
      await fs.unlink(path.join(__dirname,`../build/uploads/fotosComprobantes/${req.file.filename}`));
      return res.json({ error: "Ya ha enviado un comprobante de este curso, pronto lo revisaremos" });
    }

    //Ya está inscrito al curso
    const validacion2 = await pool.query("SELECT * FROM usuario_curso WHERE id_usuario = ? AND id_curso = ?", [req.body.id_usuario, req.body.id_curso]);
    if (validacion2[0]) {
      await fs.unlink(path.join(__dirname,`../build/uploads/fotosComprobantes/${req.file.filename}`));
      return res.json({ error: "Ya está inscrito en este curso" });
    }

    // Capacidad Validación
    const curso = await pool.query("SELECT capacidad FROM curso WHERE id_curso = ?", [req.body.id_curso]);
    if (curso[0].capacidad) {
      const count = await pool.query("SELECT COUNT(*) FROM usuario_curso WHERE id_curso = ?", [req.body.id_curso]);
      if (curso[0].capacidad <= count[0]["COUNT(*)"]) {
        await fs.unlink(path.join(__dirname + `../build/uploads/fotosComprobantes/${req.file.filename}`));
        return res.json({ error: "Ya no hay cupos disponibles" });
      }
    }

    const newComprobante = req.body;
    newComprobante.id_usuario = req.user.id_usuario;
    newComprobante.estado = "NoVisto";
    newComprobante.url_foto_comprobante = `/uploads/fotosComprobantes/${req.file.filename}`;
    const data = await pool.query("INSERT INTO comprobante set ?", [newComprobante]);
    if (data.affectedRows === 1) return res.json({ success: `Comprobante enviado` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

// .put('/:id')
ctrlComprobantes.actualizarComprobante = async (req, res) => {
  try {
    const newComprobante = req.body;
    const comprobante = await pool.query("UPDATE comprobante set ? WHERE id_comprobante = ?", [newComprobante, req.params.id]);
    const usuarioCurso = await pool.query("DELETE FROM usuario_curso WHERE id_curso = ? AND id_usuario = ?", [newComprobante.id_curso, newComprobante.id_usuario]);
    if (comprobante.affectedRows === 1 || usuarioCurso.affectedRows === 1) return res.json({ success: `Comprobante Rechazado` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlComprobantes;

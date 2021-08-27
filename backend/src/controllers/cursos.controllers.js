const pool = require("../database");
const ctrlCursos = {};
const fs = require("fs-extra");
const path = require("path");

//.get('/:tipo/:modalidad')
ctrlCursos.getCursos = async (req, res) => {
  try {
    let habilitado = "";
    if (!req.user) {
      habilitado = "AND habilitado = '1'";
    } else {
      req.user.id_rango == "1" ? (habilitado = "") : (habilitado = "AND habilitado = '1'");
    }
    const tipo = req.params.tipo == "Talleres" ? "Taller" : "Curso";
    const modalidad = req.params.modalidad == "Asincronicos" ? "Asincrónico" : "Sincrónico";
    let datosSQL = "*";
    datosSQL = "nombre,apellido,descripcion,duracion,enlace,horario,id_curso,modalidad,precio,tipo,capacidad,url_foto_curso,nombre_curso,habilitado";

    if (req.query.keyword && req.query.page) {
      const data = await pool.query(`SELECT ${datosSQL} FROM curso JOIN usuario ON usuario.id_usuario = curso.id_usuario WHERE (tipo = '${tipo}' AND modalidad = '${modalidad}') AND (nombre_curso LIKE '%${req.query.keyword}%' ${habilitado})`);
      for (let i = 0; i < data.length; i++) delete data[i].password;
      const cantidadDatos = 12;
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      return res.json({ success: "Datos obtenidos", cursos: data.splice(pagina, cantidadDatos) });
    }

    if (req.query.keyword) {
      const data = await pool.query(`SELECT ${datosSQL} FROM curso JOIN usuario ON usuario.id_usuario = curso.id_usuario WHERE (tipo = '${tipo}' AND modalidad = '${modalidad}') AND (nombre_curso LIKE '%${req.query.keyword}%' ${habilitado})`);
      for (let i = 0; i < data.length; i++) delete data[i].password;
      return res.json({ success: "Datos obtenidos", cursos: data });
    }

    if (req.query.page) {
      const cantidadDatos = 12;
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      const data = await pool.query(`SELECT ${datosSQL} FROM curso JOIN usuario ON usuario.id_usuario = curso.id_usuario WHERE tipo = '${tipo}' AND modalidad = '${modalidad}' ${habilitado}`);
      for (let i = 0; i < data.length; i++) delete data[i].password;
      return res.json({ success: "Datos obtenidos", cursos: data.splice(pagina, cantidadDatos) });
    }
    const data = await pool.query(`SELECT ${datosSQL} FROM curso JOIN usuario ON usuario.id_usuario = curso.id_usuario WHERE tipo = '${tipo}' AND modalidad = '${modalidad}' ${habilitado}`);
    for (let i = 0; i < data.length; i++) delete data[i].password;
    res.json({ success: "Datos obtenidos", cursos: data });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get('/count/:tipo/:modalidad')
ctrlCursos.getCount = async (req, res) => {
  try {
    let habilitado = "";
    if (!req.user) {
      habilitado = "AND habilitado = '1'";
    } else {
      req.user.id_rango == "1" ? (habilitado = "") : (habilitado = "AND habilitado = '1'");
    }
    const tipo = req.params.tipo == "Talleres" ? "Taller" : "Curso";
    const modalidad = req.params.modalidad == "Asincronicos" ? "Asincrónico" : "Sincrónico";
    if (req.query.keyword) {
      const data = await pool.query(`SELECT COUNT(*) FROM curso WHERE (tipo = ? AND modalidad = ?) AND (nombre_curso LIKE '%${req.query.keyword}%') ${habilitado}`, [tipo, modalidad]);
      if (data[0]["COUNT(*)"]) return res.json(data[0]["COUNT(*)"]);
      return res.json(0);
    }
    const rows = await pool.query(`SELECT COUNT(*) FROM curso WHERE tipo = ? AND modalidad = ? ${habilitado}`, [tipo, modalidad]);
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
    return res.json(0);
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};

//.get('/:id')
ctrlCursos.getCursoById = async (req, res) => {
  try {
    let habilitado = "";
    if (!req.user) {
      habilitado = "AND habilitado = '1'";
    } else {
      req.user.id_rango == "1" ? (habilitado = "") : (habilitado = "AND habilitado = '1'");
    }
    const rows = await pool.query(`SELECT * FROM curso WHERE id_curso = ? ${habilitado}`, [req.params.id]);
    if (rows.length === 0) return res.json({ error: "No existe tal curso" });
    return res.json({ success: "Dato obtenido", curso: rows[0] });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get('/sub/:id_curso')
ctrlCursos.verificarSub = async (req, res) => {
  try {
    if (!req.user) return res.json(false);
    if (req.user.id_rango === 1 || req.user.id_rango === 3) return res.json(true);

    const rows = await pool.query("SELECT * FROM usuario_curso WHERE id_curso = ? AND id_usuario = ?", [req.params.id_curso, req.user.id_usuario]);
    if (rows[0]) return res.json(true);

    return res.json(false);
  } catch (error) {
    console.log(error);
    return res.json(false);
  }
};

//.post('/')
ctrlCursos.createCurso = async (req, res) => {
  try {
    const { nombre_curso, descripcion, precio, duracion, horario, enlace, tipo, modalidad, capacidad, id_usuario,uri_carpeta_vimeo } = req.body;
    const newCurso = { nombre_curso, descripcion, precio, capacidad, duracion, horario, enlace, tipo, modalidad, id_usuario,uri_carpeta_vimeo, habilitado: 1 };

    if (modalidad === "Asincrónico") {
      delete newCurso.duracion;
      delete newCurso.horario;
      delete newCurso.enlace;
      delete newCurso.capacidad;
    }

    newCurso.url_foto_curso = `/uploads/fotosCursos/${req.file.filename}`;
    const rows = await pool.query("INSERT INTO curso set ?", [newCurso]);
    if (rows.affectedRows === 1) return res.json({ success: "Curso creado" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ya existe un curso con ese nombre" });
    return res.json({ error: "Ocurrió un error" });
  }
};

//.put('/:id')
ctrlCursos.updateCurso = async (req, res) => {
  try {
    const newCurso = req.body;
    delete newCurso.modulos;
    delete newCurso.fotoCurso;

    if (req.file) {
      const curso = await pool.query("SELECT * FROM curso WHERE id_curso = ?", [req.params.id]);

      await fs.unlink(path.join(__dirname, "../build" + curso[0].url_foto_curso));

      newCurso.url_foto_curso = `/uploads/fotosCursos/${req.file.filename}`;
    }
    const rows = await pool.query("UPDATE curso set ? WHERE id_curso = ?", [newCurso, req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Curso actualizado" }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    if (error.code === "ECONNREFUSED") return res.json({ error: "Base de datos desconectada" });
    if (error.code === "ER_DUP_ENTRY") return res.json({ error: "Ya existe un curso con ese nombre" });
    return res.json({ error: "Ocurrió un error" });
  }
};

// .delete('/:id')
ctrlCursos.deleteCurso = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM curso WHERE id_curso = ?", [req.params.id]);
    let estado = "";
    rows[0].habilitado == 0 ? (rows[0].habilitado = 1) : (rows[0].habilitado = 0);
    rows[0].habilitado == 0 ? (estado = "inhabilitado") : (estado = "habilitado");
    const data = await pool.query("UPDATE curso set ? WHERE id_curso = ?", [rows[0], req.params.id]);

    if (data.affectedRows === 1) return res.json({ success: `Curso ${rows[0].nombre_curso} ${estado}` }); //Se logró actualizar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlCursos;

const pool = require("../database");
const ctrlUsuariocurso = {};
const nodemailer = require("nodemailer");
const mail = require("../lib/mail");
const llaves = require("../config");

//.get("/estudiante/:idEstudiante")
ctrlUsuariocurso.getUsuariocursoByIdEstudiante = async (req, res) => {
  try {
    if (req.user.id_usuario != req.params.idEstudiante) return res.json({ error: "No tienes permiso para esa acción" });

    const rows = await pool.query("SELECT id_usuario_curso,nombre_curso,descripcion,url_foto_curso,habilitado,tipo,modalidad,enlace,favorito,curso.id_curso FROM usuario_curso JOIN curso ON usuario_curso.id_curso = curso.id_curso WHERE usuario_curso.id_usuario = ? AND habilitado = '1'", [req.params.idEstudiante]);
    return res.json({ success: "Datos obtenidos", cursos: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get("/curso/:idCurso")
ctrlUsuariocurso.getUsuariocursoByIdCurso = async (req, res) => {
  try {
    const rows = await pool.query("SELECT id_usuario_curso,usuario.id_usuario,nombre,apellido,correo,telefono,url_foto_usuario FROM usuario_curso JOIN usuario ON usuario_curso.id_usuario = usuario.id_usuario WHERE id_curso = ?", [req.params.idCurso]);
    return res.json({ success: "Datos obtenidos", usuariosCursos: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get("/count/estudiante/:id")
ctrlUsuariocurso.getCountUsuarioCursoByCursoId = async (req, res) => {
  try {
    const rows = await pool.query("SELECT COUNT(*) FROM usuario_curso WHERE id_curso = ?", [req.params.id]);
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
    return res.json(0);
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};

//.post("/")
ctrlUsuariocurso.createUsuariocurso = async (req, res) => {
  try {
    const { id_comprobante, id_usuario, id_curso, url_foto_comprobante } = req.body;
    const newUsuariocurso = {
      id_usuario,
      id_curso,
      url_comprobante: url_foto_comprobante,
      favorito: 0,
    };
    const newComprobante = {
      estado: "Aceptado",
    };
    const estudiante = await pool.query("SELECT * FROM usuario WHERE id_usuario = ?", [id_usuario]);
    const curso = await pool.query("SELECT * FROM curso WHERE id_curso = ?", [id_curso]);

    let contentHTML = `
      <h1>Se ha aceptado su comprobante</h1>
      <p>Bienvenido al ${curso[0].tipo} ${curso[0].modalidad} ${curso[0].nombre_curso}</p>
    `;
    if (curso[0].modalidad === "Sincrónico") {
      contentHTML = `
        <h1>Se ha aceptado su comprobante</h1>
        <p>Bienvenido al ${curso[0].tipo} ${curso[0].modalidad} ${curso[0].nombre_curso}</p>
        <a href="${curso[0].enlace}">${curso[0].enlace}</a>
        `;
    }
    let info = await mail.sendMail({
      from: `Inscripción a ${curso[0].tipo} ${curso[0].modalidad} ${curso[0].nombre_curso} <${llaves.USER_EMAIL}>`, // sender address,
      to: estudiante[0].correo,
      subject: "Inscripción al Curso",
      html: contentHTML,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    const data = await pool.query("INSERT INTO usuario_curso set ?", [newUsuariocurso]);
    await pool.query("UPDATE comprobante set ? WHERE id_comprobante = ?", [newComprobante, id_comprobante]);
    if (data.affectedRows === 1) return res.json({ success: `Inscripción realizada` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.put("/:idCurso/:idUsuario")
ctrlUsuariocurso.setFavorito = async (req, res) => {
  try {
    let favorito = "";
    if (req.user.id_usuario != req.params.idUsuario) return res.json({ error: "No tienes permiso para esa acción" });

    const rows = await pool.query("SELECT * FROM usuario_curso WHERE id_curso = ? AND id_usuario = ?", [req.params.idCurso, req.params.idUsuario]);

    rows[0].favorito == 0 ? (rows[0].favorito = 1) : (rows[0].favorito = 0);
    const data = await pool.query("UPDATE usuario_curso set ? WHERE id_curso = ? AND id_usuario = ?", [rows[0], req.params.idCurso, req.params.idUsuario]);
    rows[0].favorito == 0 ? (favorito = "Quitado de la lista de Favoritos") : (favorito = "Agregado a la lista de Favoritos");

    if (data.affectedRows === 1) return res.json({ success: `${favorito}` }); //Se logró actualizar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

// //.delete("/:id")
// ctrlUsuariocurso.deleteUsuariocurso = async (req, res) => {
//   if (data.affectedRows === 1) return res.json({ success: `Comprobante Eliminado` }); //Se logró actualizar
//   return res.json({ error: "Ocurrió un error" });
// };

module.exports = ctrlUsuariocurso;

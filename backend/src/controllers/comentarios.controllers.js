const pool = require("../database");
const ctrlComentarios = {};
const helpers = require("../lib/helpers");

//.get(/:idCurso/:idTema)
ctrlComentarios.getComentarios = async (req, res) => {
  // Tema
  if (req.params.idTema) {
    if (req.query.page) {
      const cantidadDatos = 4;
      const pagina = parseInt(req.query.page) * cantidadDatos;
      const rows = await pool.query("SELECT id_comentario,id_rango,comentario,fecha,nombre,apellido,url_foto_usuario,comentario.id_usuario FROM comentario JOIN usuario ON comentario.id_usuario=usuario.id_usuario WHERE id_tema = ? ORDER BY fecha DESC", [req.params.idTema]);
      return res.json(rows.splice(0, pagina));
    }
    const rows = await pool.query("SELECT id_comentario,id_rango,comentario,fecha,nombre,apellido,url_foto_usuario,comentario.id_usuario FROM comentario JOIN usuario ON comentario.id_usuario=usuario.id_usuario WHERE id_tema = ? ORDER BY fecha DESC", [req.params.idTema]);
    return res.json(rows);
  }

  // Curso
  if (req.query.page) {
    const cantidadDatos = 4;
    const pagina = parseInt(req.query.page) * cantidadDatos;
    const rows = await pool.query("SELECT id_comentario,id_rango,comentario,fecha,nombre,apellido,url_foto_usuario,comentario.id_usuario FROM comentario JOIN usuario ON comentario.id_usuario=usuario.id_usuario WHERE id_curso = ? ORDER BY fecha DESC", [req.params.idCurso]);
    return res.json(rows.splice(0, pagina));
  }
  const rows = await pool.query("SELECT id_comentario,id_rango,comentario,fecha,nombre,apellido,url_foto_usuario,comentario.id_usuario FROM comentario JOIN usuario ON comentario.id_usuario=usuario.id_usuario WHERE id_curso = ? ORDER BY fecha DESC", [req.params.idCurso]);
  return res.json(rows);
};

// .get("/count/:idCurso/:idTema)
ctrlComentarios.getCount = async (req, res) => {
  // Tema
  if (req.params.idTema) {
    const rows = await pool.query("SELECT COUNT(*) FROM comentario JOIN usuario ON comentario.id_usuario=usuario.id_usuario WHERE id_tema = ? ORDER BY fecha DESC", [req.params.idTema]);
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
    return res.json(0);
  }

  // Curso
  const rows = await pool.query("SELECT COUNT(*) FROM comentario JOIN usuario ON comentario.id_usuario=usuario.id_usuario WHERE id_curso = ? ORDER BY fecha DESC", [req.params.idCurso]);
  if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
  return res.json(0);
};

// .post("/:idCurso/:idTema")
ctrlComentarios.createComentario = async (req, res) => {
  if (!req.user) return res.json({ error: "Necesitas una cuenta para comentar" }); //Poner ! en producción

  const newComentario = req.body;
  newComentario.fecha = new Date();
  newComentario.id_usuario = req.user.id_usuario; //Poner req.user.id_usuario en producción
  delete newComentario.id_rango;
  if (newComentario.id_tema) delete newComentario.id_curso;

  if (newComentario.id_curso) delete newComentario.id_tema;

  const rows = await pool.query("INSERT INTO comentario set ?", [newComentario]);

  if (rows.affectedRows > 0) return res.json({ success: "Gracias por tus comentarios." }); //Se logró registrar

  return res.json({ error: "Ocurrió un error, intentelo más tarde." });
};

// .delete("/:id")
ctrlComentarios.deleteComentario = async (req, res) => {
  const id_comentario = req.params.id;
  const rows = await pool.query("DELETE FROM comentario WHERE id_comentario = ?", [id_comentario]);

  if (rows.affectedRows > 0) return res.json({ success: "Comentario eliminado." }); //Se logró borrar

  return res.json({ error: "Ocurrió un error, intentelo más tarde." });
};

module.exports = ctrlComentarios;

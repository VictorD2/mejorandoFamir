const pool = require("../database");
const ctrlTema = {};

//.get('/:id')
ctrlTema.getTemaByModuloId = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM tema WHERE id_modulo = ?", [req.params.id]);
    return res.json({ success: "Datos obtenidos", temas: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get('/idTema/:id')
ctrlTema.getTemaById = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM tema WHERE id_tema = ?", [req.params.id]);
    if (rows[0]) return res.json({ success: "Dato obtenido", tema: rows[0] });
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.post('/')
ctrlTema.createTema = async (req, res) => {
  try {
    const { titulo, descripcion, id_modulo, url_video } = req.body;

    const newTema = { titulo, descripcion, url_video, id_modulo };

    const rows = await pool.query("INSERT INTO tema set ? ", [newTema]);

    if (rows.affectedRows === 1) return res.json({ success: "Tema creado" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.put('/:id')
ctrlTema.actualizarTema = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const newTema = { titulo, descripcion };

    await pool.query("UPDATE tema set ? WHERE id_tema = ?", [newTema, req.params.id]);
    return res.json({ success: "Tema modificado correctamente" }); //Se logró registrar
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.delete('/:id')
ctrlTema.eliminarTema = async (req, res) => {
  try {
    const rows = await pool.query("DELETE FROM tema WHERE id_tema = ?", [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Tema eliminado" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlTema;

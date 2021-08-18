const pool = require("../database");
const ctrlModulos = {};

//.get("/:id")
ctrlModulos.getModuloByCursoId = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM modulo WHERE id_curso = ?", [req.params.id]);
    return res.json({ success: "Datos obtenidos", modulos: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.post("/")
ctrlModulos.createModulo = async (req, res) => {
  try {
    const newModulo = req.body;
    const rows = await pool.query("INSERT INTO modulo set ?", [newModulo]);
    if (rows.affectedRows === 1) return res.json({ success: "Modulo creado" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.delete("/:id")
ctrlModulos.eliminarModulo = async (req, res) => {
  try {
    const rows = await pool.query("DELETE FROM modulo WHERE id_modulo = ?", [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Modulo eliminado" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.put("/")
ctrlModulos.actualizarModulo = async (req, res) => {
  try {
    newModulo = req.body;
    delete newModulo.temas;
    const rows = await pool.query("UPDATE modulo set ? WHERE id_modulo = ?", [newModulo, newModulo.id_modulo]);
    if (rows.affectedRows === 1) return res.json({ success: "Modulo modificado" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlModulos;

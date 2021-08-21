const pool = require("../database");
const ctrlTarea = {};

//.get("/single/:id")
ctrlTarea.getTareaById = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM tarea WHERE id_tarea = ?", [req.params.id]);
    if (!rows[0]) return res.json({ error: "No existe tal tarea" });
    return res.json({ success: "Dato obtenido", tarea: rows[0] });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get("/:id")
ctrlTarea.getTareasByModuloId = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM tarea WHERE id_modulo = ?", [req.params.id]);
    res.json({ success: "Datos obtenidos", tareas: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.post("/")
ctrlTarea.createTarea = async (req, res) => {
  try {
    const newTarea = req.body;
    const rows = await pool.query("INSERT INTO tarea set ?", [newTarea]);

    if (rows.affectedRows === 1) return res.json({ success: "Tarea creada" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.delete("/:id")
ctrlTarea.eliminarTarea = async (req, res) => {
  try {
    const rows = await pool.query("DELETE FROM tarea WHERE id_tarea = ?", [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Tarea eliminada" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.put("/")
ctrlTarea.actualizarTarea = async (req, res) => {
  try {
    newTarea = req.body;
    const rows = await pool.query("UPDATE tarea set ? WHERE id_tarea = ?", [newTarea, newTarea.id_tarea]);

    if (rows.affectedRows === 1) return res.json({ success: "Tarea modificada" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlTarea;

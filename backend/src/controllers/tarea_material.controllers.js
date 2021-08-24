const pool = require("../database");
const ctrlTareaMaterial = {};
const fs = require("fs-extra");
const path = require("path");

//.get("/:id")
ctrlTareaMaterial.getTareasByTareaId = async (req, res) => {
  try {
    const rows = await pool.query("SELECT nombre_material_tarea,nombre,apellido,fecha_entrega,id_material_tarea,url_material,id_tarea FROM material_tarea JOIN usuario ON usuario.id_usuario = material_tarea.id_usuario WHERE id_tarea = ?", [req.params.id]);
    res.json({ success: "Datos obtenidos", material: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.post("/")
ctrlTareaMaterial.createTareaMaterial = async (req, res) => {
  try {
    const url_material_tarea = `/uploads/tareas/${req.files.material_tarea[0].filename}`;
    const { id_tarea } = req.body;
    const newTarea = {
      id_tarea,
      url_material: url_material_tarea,
      id_usuario: req.user.id_usuario,
      fecha_entrega: req.body.fecha_entrega,
      nombre_material_tarea: req.files.material_tarea[0].originalname,
    };
    const rows = await pool.query("INSERT INTO material_tarea set ?", [newTarea]);
    if (rows.affectedRows === 1) return res.json({ success: "Tarea Enviada" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.delete("/:id")
ctrlTareaMaterial.eliminarTareaMaterial = async (req, res) => {
  try {
    const material = await pool.query("SELECT * FROM material_tarea WHERE id_material_tarea = ?", [req.params.id]);
    await fs.unlink(path.join(__dirname, "../build" + material[0].url_material));
    const rows = await pool.query("DELETE FROM material_tarea WHERE id_material_tarea = ?", [req.params.id]);

    if (rows.affectedRows === 1) return res.json({ success: "Tarea eliminada" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlTareaMaterial;

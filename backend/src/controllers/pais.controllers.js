const pool = require("../database");
const ctrlPais = {};

//.get("/")
ctrlPais.getPaises = async (req, res) => {
  try {
    const paises = await pool.query("SELECT * FROM pais ORDER BY nombre_pais ASC");
    return res.json({ success: "Datos obtenidos", paises: paises });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};
//.get("/:idPais")
ctrlPais.getPais = async (req, res) => {
  try {
    const paises = await pool.query("SELECT * FROM pais WHERE id_pais = ? ORDER BY nombre_pais ASC", [req.params.idPais]);
    return res.json({ success: "Datos obtenido", pais: paises[0].url_foto_pais });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlPais;

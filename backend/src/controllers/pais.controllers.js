const pool = require("../database");
const ctrlPais = {};

//.get("/")
ctrlPais.getPaises = async (req, res) => {
  const paises = await pool.query("SELECT * FROM pais ORDER BY nombre_pais ASC");
  res.json(paises);
};
//.get("/:idPais")
ctrlPais.getPais = async (req, res) => {
  const paises = await pool.query("SELECT * FROM pais WHERE id_pais = ? ORDER BY nombre_pais ASC", [req.params.idPais]);
  res.json(paises[0].url_foto_pais);
};

module.exports = ctrlPais;

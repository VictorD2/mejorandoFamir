const pool = require("../database");
const ctrlTema = {};
const path = require("path");
const fs = require("fs-extra");

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
    const { titulo, descripcion, id_modulo, id_tema } = req.body;
    const newTema = { titulo, descripcion, id_modulo, id_tema };

    // if (req.file) {
    //   const tema = await pool.query("SELECT * FROM tema WHERE id_tema = ?", [id_tema]);

    //   if (tema[0].url_video.search(`/uploads/video/${req.file.filename}`) == -1) await fs.unlink(path.join(__dirname, "../" + tema[0].url_video));

    //   newTema.url_video = `/uploads/video/${req.file.filename}`;
    // }

    const rows = await pool.query("UPDATE tema set ? WHERE id_tema = ?", [newTema, newTema.id_tema]);

    if (rows.affectedRows === 1) return res.json({ success: "Tema modificado correctamente" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.delete('/:id')
ctrlTema.eliminarTema = async (req, res) => {
  try {
    // const tema = await pool.query("SELECT * FROM tema WHERE id_tema = ?", [req.params.id]);
    // await fs.unlink(path.join(__dirname, "../" + tema[0].url_video));
    const rows = await pool.query("DELETE FROM tema WHERE id_tema = ?", [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: "Tema eliminado" }); //Se logró registrar

    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get('/video-lock')
ctrlTema.getVideo = async (req, res) => {
  const range = req.headers.range;

  if (req.query.key !== "1v4g8h6vcesm") return res.json({ error: "Wrong key" });

  if (!range) return res.json({ error: "Requires Range header" });
  const videoPath = path.join(__dirname, `..//${req.query.Tema}`);
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 0.6 * 10 ** 6; // 0.5MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
};

module.exports = ctrlTema;

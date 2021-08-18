const pool = require("../database");
const ctrlContacto = {};
const nodemailer = require("nodemailer");
const mail = require("../lib/mail");
const llaves = require("../config");
//.get("/")
ctrlContacto.getContactos = async (req, res) => {
  try {
    if (req.query.keyword && req.query.page) {
      const rows = await pool.query(`SELECT * FROM contactos WHERE (nombre LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%') ORDER BY id_contacto DESC`);
      const cantidadDatos = 12;
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      return res.json({ success: "Datos obtenidos", contactos: rows.splice(pagina, cantidadDatos) });
    }

    if (req.query.keyword) {
      const rows = await pool.query(`SELECT * FROM contactos WHERE (nombre LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%') ORDER BY id_contacto DESC`);
      return res.json({ success: "Datos obtenidos", contactos: rows });
    }

    if (req.query.page) {
      const rows = await pool.query("SELECT * FROM contactos ORDER BY id_contacto DESC");
      const cantidadDatos = 12;
      const pagina = (parseInt(req.query.page) - 1) * cantidadDatos;
      return res.json({ success: "Datos obtenidos", contactos: rows.splice(pagina, cantidadDatos) });
    }
    const rows = await pool.query("SELECT * FROM contactos ORDER BY id_contacto DESC");
    return res.json({ success: "Datos obtenidos", contactos: rows });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.get("/count")
ctrlContacto.getCount = async (req, res) => {
  try {
    if (req.query.keyword) {
      const rows = await pool.query(`SELECT COUNT(*) FROM contactos WHERE (nombre LIKE '%${req.query.keyword}%' OR correo LIKE '%${req.query.keyword}%')`);
      if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
      return res.json(0);
    }
    const rows = await pool.query("SELECT COUNT(*) FROM contactos");
    if (rows[0]["COUNT(*)"]) return res.json(rows[0]["COUNT(*)"]);
    return res.json(0);
  } catch (error) {
    console.log(error);
    return res.json(0);
  }
};

// .get("/:id")
ctrlContacto.getContactoById = async (req, res) => {
  try {
    const rows = await pool.query("SELECT * FROM contactos WHERE id_contacto = ?", [req.params.id]);
    if (rows[0]) return res.json({ success: "Dato obtenido", contacto: rows[0] });
    return res.json({ error: "No existe al mensaje de contacto" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "No existe al mensaje de contacto" });
  }
};

// .post("/")
ctrlContacto.createContacto = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContacto = {
      nombre: name,
      correo: email,
      mensaje: message,
    };
    let contentHTML = `
      <h1>User Information</h1>
      <ul>
          <li>Nombre: ${newContacto.nombre}</li>
          <li>Correo: ${newContacto.correo}</li>
      </ul>
      <p>${newContacto.mensaje}</p>`;

    let info = await mail.sendMail({
      from: `Famir Web <${llaves.USER_EMAIL}>`, // sender address,
      to: "victorhv2729@gmail.com",
      subject: "Mensaje de Contacto",
      html: contentHTML,
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    const rows = await pool.query("INSERT INTO contactos SET ?", [newContacto]);
    if (rows.affectedRows === 1) return res.json({ success: "Mensaje Enviado" }); //Se logró registrar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

//.delete("/:id")
ctrlContacto.deleteContacto = async (req, res) => {
  try {
    const rows = await pool.query("DELETE FROM contactos WHERE id_contacto = ?", [req.params.id]);
    if (rows.affectedRows === 1) return res.json({ success: `Mensaje eliminado` }); //Se logró actualizar
    return res.json({ error: "Ocurrió un error" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
};

module.exports = ctrlContacto;

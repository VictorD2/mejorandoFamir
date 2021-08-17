const llaves = require("../config");
const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: llaves.HOST_EMAIL,
  port: llaves.PORT_EMAIL,
  secure: llaves.SECURE_EMAIL,
  auth: {
    user: llaves.USER_EMAIL,
    pass: llaves.PASS_EMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

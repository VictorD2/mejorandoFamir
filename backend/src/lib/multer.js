const multer = require("multer");
const path = require("path");
const multerCtrl = {};
// Settings
const storageVideos = multer.diskStorage({
  destination: path.join(__dirname, "../uploads/video"),
  filename: (req, file, cb) => {
    const fecha = new Date();
    cb(null, `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`);
  },
});
const filterVideos = (req, file, cb) => {
  const filetypes = /mp4|MP4/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Archivo debe ser un video .mp4.");
};

const storageFotosPerfil = multer.diskStorage({
  destination: path.join(__dirname, "../build/uploads/fotosPerfil"),
  filename: (req, file, cb) => {
    const fecha = new Date();
    cb(null, `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`);
  },
});
const storageFotosCursos = multer.diskStorage({
  destination: path.join(__dirname, "../build/uploads/fotosCursos"),
  filename: (req, file, cb) => {
    const fecha = new Date();
    cb(null, `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`);
  },
});
const storageFotosComprobantes = multer.diskStorage({
  destination: path.join(__dirname, "../build/uploads/fotosComprobantes"),
  filename: (req, file, cb) => {
    const fecha = new Date();
    cb(null, `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`);
  },
});
const filterFotos = async (req, file, cb) => {
  const filetypes = /JPG|JPEG|jpg|jpeg|png|PNG/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname));
  // if (!req.user) return cb('Necesita una cuenta para esto');
  if (mimetype && extname) return cb(null, true);
  cb("Archivo debe ser una foto.");
};
const storageArchivos = multer.diskStorage({
  destination: path.join(__dirname, "../build/uploads/material"),
  filename: (req, file, cb) => {
    const fecha = new Date();
    cb(null, `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`);
  },
});
const storageTareas = multer.diskStorage({
  destination: path.join(__dirname, "../build/uploads/tareas"),
  filename: (req, file, cb) => {
    const fecha = new Date();
    cb(null, `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()}-${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}${file.originalname}`);
  },
});
multerCtrl.videos = multer({ storage: storageVideos, fileFilter: filterVideos });
multerCtrl.fotosPerfil = multer({ storage: storageFotosPerfil, fileFilter: filterFotos });
multerCtrl.fotosCursos = multer({ storage: storageFotosCursos, fileFilter: filterFotos });
multerCtrl.fotosComprobantes = multer({ storage: storageFotosComprobantes, fileFilter: filterFotos });
multerCtrl.archivos = multer({ storage: storageArchivos });
multerCtrl.storageTareas = multer({ storage: storageTareas });

module.exports = multerCtrl;

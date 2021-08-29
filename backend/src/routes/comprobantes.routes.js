const router = require("express").Router();
const ctrlComprobantes = require("../controllers/comprobantes.controllers");
const { isAdminApi } = require("../lib/auth");
const upload = require("../lib/multer");

router.get("/count/:estado", [isAdminApi], ctrlComprobantes.getCount);
router.get("/:estado/:page", [isAdminApi], ctrlComprobantes.getComprobantes);
router.get("/:id", [isAdminApi], ctrlComprobantes.getComprobanteById);
router.post("/",(req, res, next) => {
    upload.fotosComprobantes.single("fotoComprobante")(req, res, (err) => {
      if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
      next();
    });
  },
  ctrlComprobantes.createComprobante
);

router.put("/:id", [isAdminApi], ctrlComprobantes.actualizarComprobante);
// router.delete('/:id', ctrlComprobantes.deleteComprobante);

module.exports = router;

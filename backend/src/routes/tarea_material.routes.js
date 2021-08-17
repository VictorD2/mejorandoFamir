const router = require("express").Router();
const ctrlTareaMaterial = require("../controllers/tarea_material.controllers");
const upload = require('../lib/multer');

router.get("/:id", ctrlTareaMaterial.getTareasByTareaId);
router.post("/", function(req, res, next) {
    upload.storageTareas.fields([{ name: 'material_tarea' }])(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
},ctrlTareaMaterial.createTareaMaterial);
router.delete("/:id", ctrlTareaMaterial.eliminarTareaMaterial);

module.exports = router;

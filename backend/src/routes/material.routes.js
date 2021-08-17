const router = require('express').Router();
const ctrlModulo = require('../controllers/material.controllers');
const upload = require('../lib/multer');

router.get('/:id', ctrlModulo.getMaterialByTemaId);

router.post('/', function(req, res, next) {
    upload.archivos.fields([{ name: 'material' }])(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlModulo.createMaterial);

router.delete('/:id', ctrlModulo.deleteMaterial);

module.exports = router;
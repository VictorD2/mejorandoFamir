const router = require('express').Router();
const ctrlModulo = require('../controllers/material.controllers');
const upload = require('../lib/multer');
const { isAdminApi } = require("../lib/auth");

router.get('/:id', ctrlModulo.getMaterialByTemaId);

router.post('/',[isAdminApi], function(req, res, next) {
    upload.archivos.fields([{ name: 'material' }])(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlModulo.createMaterial);

router.delete('/:id',[isAdminApi], ctrlModulo.deleteMaterial);

module.exports = router;
const router = require('express').Router();
const ctrlComprobantes = require('../controllers/comprobantes.controllers');
const { isAdmin } = require('../lib/auth');
const upload = require('../lib/multer');

router.get('/count/:estado', ctrlComprobantes.getCount);
router.get('/:estado/:page',  ctrlComprobantes.getComprobantes);
router.get('/:id', ctrlComprobantes.getComprobanteById);
router.post('/', function(req, res, next) {
    upload.fotosComprobantes.single('fotoComprobante')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlComprobantes.createComprobante);

router.put('/:id', ctrlComprobantes.actualizarComprobante);
// router.delete('/:id', ctrlComprobantes.deleteComprobante);

module.exports = router;
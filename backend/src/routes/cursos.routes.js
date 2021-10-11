const router = require('express').Router();
const ctrlCursos = require('../controllers/cursos.controllers');
const { isAdminApi } = require('../lib/auth');
const upload = require('../lib/multer');

router.get('/count/:tipo/:modalidad',ctrlCursos.getCount);
router.get('/sub/:id_curso', ctrlCursos.verificarSub);
router.get('/:tipo/:modalidad', ctrlCursos.getCursos);
router.get('/topCurso', ctrlCursos.topCurso);
router.get('/footer', ctrlCursos.footer);
router.get('/:id', ctrlCursos.getCursoById);
router.post('/',[isAdminApi], function(req, res, next) {
    upload.fotosCursos.single('fotoCurso')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlCursos.createCurso);

router.put('/:id',[isAdminApi], function(req, res, next) {
    upload.fotosCursos.single('fotoCurso')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlCursos.updateCurso);

router.delete('/:id',[isAdminApi], ctrlCursos.deleteCurso);

module.exports = router;
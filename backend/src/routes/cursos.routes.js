const router = require('express').Router();
const ctrlCursos = require('../controllers/cursos.controllers');
const { isAdmin } = require('../lib/auth');
const upload = require('../lib/multer');

router.get('/count/:tipo/:modalidad',ctrlCursos.getCount);
router.get('/sub/:id_curso', ctrlCursos.verificarSub);
router.get('/:tipo/:modalidad', ctrlCursos.getCursos);
router.get('/:id', ctrlCursos.getCursoById);
router.post('/', function(req, res, next) {
    upload.fotosCursos.single('fotoCurso')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlCursos.createCurso);

router.put('/:id', function(req, res, next) {
    upload.fotosCursos.single('fotoCurso')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlCursos.updateCurso);

router.delete('/:id', ctrlCursos.deleteCurso);

module.exports = router;
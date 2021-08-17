const router = require('express').Router();
const ctrlUsuarios = require('../controllers/usuarios.controllers');
const { isAdmin, typePetition } = require('../lib/auth');
const upload = require('../lib/multer');


// router.get('/', [typePetition], ctrlUsuarios.getUsers);
router.get('/whoami', ctrlUsuarios.whoiam);
// router.get('/:id', ctrlUsuarios.getUserById);
// router.post('/', ctrlUsuarios.createUser);
router.put('/:id', ctrlUsuarios.updateUserDatos);
router.put('/password/:id', ctrlUsuarios.updatePassword);
router.put('/img/:id', function(req, res, next) {
    upload.fotosPerfil.single('fotoPerfil')(req, res, function(err) {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlUsuarios.updateImg);
// router.delete('/:id', ctrlUsuarios.deleteUser);

module.exports = router;
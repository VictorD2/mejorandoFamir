const router = require('express').Router();
const ctrlUsuarios = require('../controllers/usuarios.controllers');
const upload = require('../lib/multer');

router.get('/whoami', ctrlUsuarios.whoiam);
router.put('/:id', ctrlUsuarios.updateUserDatos);
router.put('/password/:id', ctrlUsuarios.updatePassword);
router.put('/img/:id', (req, res, next)=> {
    upload.fotosPerfil.single('fotoPerfil')(req, res, (err)=> {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlUsuarios.updateImg);
// router.delete('/:id', ctrlUsuarios.deleteUser);

module.exports = router;
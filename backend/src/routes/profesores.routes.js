const router = require("express").Router();
const ctrlProfesores = require("../controllers/profesores.controllers");
const { isAdminApi } = require("../lib/auth");
const upload = require("../lib/multer");

router.get("/", [isAdminApi], ctrlProfesores.getProfesores);
router.get("/public", ctrlProfesores.getProfesoresPublic);
router.get("/count", ctrlProfesores.getCount);
router.get("/:id", ctrlProfesores.getProfesorById);
router.post("/", [isAdminApi], (req, res, next)=> {
    upload.fotosProfesores.single('url_foto_profesor')(req, res, (err)=> {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlProfesores.createProfesor);
router.put("/:id", [isAdminApi], (req, res, next)=> {
    upload.fotosProfesores.single('url_foto_profesor')(req, res, (err)=> {
        if (err) return res.json({ error: err }); // A Multer error occurred when uploading.
        next();
    })
}, ctrlProfesores.updateProfesor);
router.delete("/:id", [isAdminApi], ctrlProfesores.deleteProfesor);

module.exports = router;

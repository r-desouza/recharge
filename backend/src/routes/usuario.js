const {Router} = require('express');
const router = Router();

const { createUsuario, getUsuario, getUsuarioById, deleteUsuario, updateUsuario} = require('../controller/usuario.controller') 

router.route('/')
        .get(getUsuario)
        .post(createUsuario)

router.route('/:id')
        .get(getUsuarioById)
        .delete(deleteUsuario)
        .put(updateUsuario)


module.exports = router;        
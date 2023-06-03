const {Router} = require('express');
const router = Router();

const { createRecarga, getRecarga, getRecargaById, deleteRecarga, updateRecarga} = require('../controller/recarga.controller') 

router.route('/')
        .get(getRecarga)
        .post(createRecarga)

router.route('/:id')
        .get(getRecargaById)
        .delete(deleteRecarga)
        .put(updateRecarga)


module.exports = router;        
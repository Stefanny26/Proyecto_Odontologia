const express = require('express');
const router = express.Router();
const citaController = require('../controllers/cita.controller');

router.get('/', citaController.getAll);
router.post('/', citaController.create);
router.get('/fecha/:fecha', citaController.getCitasPorFecha); // Esta ruta es importante
router.put('/:id', citaController.update);
router.delete('/:id', citaController.delete);

module.exports = router;

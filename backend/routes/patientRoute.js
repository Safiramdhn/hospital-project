const express = require('express');
const patientController = require('../controllers/patientController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/find-patient-record', authMiddleware, patientController.findPatientByCredentials);
router.get('/',authMiddleware, patientController.getAllPatients);
router.get('/:id', authMiddleware, patientController.getPatientById);
router.post('/', authMiddleware, patientController.createPatient);

module.exports = router;
const express = require('express');
const controllers = require('../controllers/outpatientRegistrationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, controllers.createOutPatientRegistration);

module.exports = router;
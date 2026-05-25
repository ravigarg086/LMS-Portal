const express = require('express');
const { listExternalUsers } = require('../controllers/externalDataController');

const router = express.Router();

router.get('/users', listExternalUsers);

module.exports = router;

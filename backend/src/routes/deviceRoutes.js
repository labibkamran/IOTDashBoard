const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.post('/data', deviceController.createDeviceData);
router.get('/data/latest', deviceController.getLatestData);
router.get('/data/:deviceId', deviceController.getDeviceData);

module.exports = router; 
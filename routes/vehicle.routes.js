const express = require('express')
const router = express.Router()

const vehicleController = require('../controllers/vehicle.controller')

// Vehicle Routes
router.post('/vehicle', vehicleController.createVehicle)

module.exports = router
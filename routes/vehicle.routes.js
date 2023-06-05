const express = require('express')
const router = express.Router()

const vehicleController = require('../controllers/vehicle.controller')

// Vehicle Routes
router.post('/vehicle', vehicleController.createVehicle)
// // vehicle-brands
router.get('/vehicle-brands', vehicleController.getVehicleBrands)
router.get('/vehicle-brands/:id', vehicleController.getVehicleBrandById)
// // vehicle-types
router.get('/vehicle-types', vehicleController.getVehicleTypes)
router.get('/vehicle-types/:id', vehicleController.getVehicleTypeById)

module.exports = router
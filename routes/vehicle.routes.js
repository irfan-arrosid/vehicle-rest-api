const express = require('express')
const router = express.Router()

const vehicleController = require('../controllers/vehicle.controller')

// Vehicle Routes
// // vehicle-brands
router.post('/vehicle-brands', vehicleController.createNewBrand)
router.get('/vehicle-brands', vehicleController.getAllBrands)
router.delete('/vehicle-brands/:id', vehicleController.deleteBrand)
// // vehicle-types
router.post('/vehicle-types', vehicleController.createNewType)
router.get('/vehicle-types', vehicleController.getAllTypes)
router.delete('/vehicle-types/:id', vehicleController.deleteType)
// // vehicle-models
router.get('/vehicle-models', vehicleController.getVehicleModels)
router.get('/vehicle-models/:id', vehicleController.getVehicleModelById)
// // vehicle-years
router.get('/vehicle-years', vehicleController.getVehicleYears)
router.get('/vehicle-years/:id', vehicleController.getVehicleYearById)
// // pricelist
router.get('/pricelist/:id', vehicleController.getPricelistById)

module.exports = router
const sequelize  = require('../config/database')
const { Sequelize } = require('sequelize')
const conn = {}
conn.sequelize = sequelize
conn.Sequelize = Sequelize

const VehicleBrand = require('../models/VehicleBrand')
const VehicleType = require('../models/VehicleType')
const VehicleModel = require('../models/VehicleModel')
const VehicleYear = require('../models/VehicleYear')
const Pricelist = require('../models/Pricelist')

// POST /vehicle
const createVehicle = async (req, res) => {
    const { brandName, typeName, modelName, year } = req.body

    try {
        await sequelize.transaction(async (t) => {
            // Input data to vehicle_brands table
            const vehicleBrand = await VehicleBrand.create(
                { name: brandName },
                { transaction: t }
            )

            // Input data to vehicle_types table using foreignKey
            const vehicleType = await VehicleType.create(
                { name: typeName, brandId: vehicleBrand.brandId },
                { transaction: t }
            )

            // Input data to vehicle_models table using foreignKey
            const vehicleModel = await VehicleModel.create(
                { name: modelName, typeId: vehicleType.typeId },
                { transaction: t }
            )

            // Input data to vehicle_years table
            const vehicleYear = await VehicleYear.create(
                { year },
                { transaction: t }
            )

            // Input data to pricelist
            await Pricelist.create(
                { yearId: vehicleYear.id, modelId: vehicleModel.modelId },
                { transaction: t }
            )
        })

        res.status(201).json({
            message: 'Create vehicle is success'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

module.exports = {
    createVehicle
}
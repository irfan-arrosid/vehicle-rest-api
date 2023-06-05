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
                { name: typeName, brandId: vehicleBrand.id },
                { transaction: t }
            )

            // Input data to vehicle_models table using foreignKey
            const vehicleModel = await VehicleModel.create(
                { name: modelName, typeId: vehicleType.id },
                { transaction: t }
            )

            // Input data to vehicle_years table
            const vehicleYear = await VehicleYear.create(
                { year },
                { transaction: t }
            )

            // Input data to pricelist
            await Pricelist.create(
                { yearId: vehicleYear.id, modelId: vehicleModel.id },
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

// GET /vehicle-brands
const getVehicleBrands = async (req, res) => {
    try {
        const vehicleBrands = await VehicleBrand.findAll({
            attributes: ['name', 'id']
        })

        res.status(200).json({
            message: 'Get vehicle brands is success',
            data: vehicleBrands
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-brands/:id
const getVehicleBrandById = async (req, res) => {
    const { id } = req.params

    try {
        const vehicleBrand = await VehicleBrand.findByPk(id, {
            attributes: ['name', 'id']
        })

        res.status(200).json({
            message: 'Get vehicle brand is success',
            data: vehicleBrand
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-types
const getVehicleTypes = async (req, res) => {
    try {
        const vehicleTypes = await VehicleType.findAll({
            attributes: ['name', 'id']
        })

        res.status(200).json({
            message: 'Get vehicle types is success',
            data: vehicleTypes
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-types/:id
const getVehicleTypeById = async (req, res) => {
    const { id } = req.params

    try {
        const vehicleType = await VehicleType.findByPk(id, {
            attributes: ['name', 'id']
        })

        res.status(200).json({
            message: 'Get vehicle type is success',
            data: vehicleType
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

module.exports = {
    createVehicle,
    getVehicleBrands,
    getVehicleBrandById,
    getVehicleTypes,
    getVehicleTypeById
}
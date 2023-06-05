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
            // Create data to vehicle_brands table
            const [vehicleBrand] = await VehicleBrand.findOrCreate({
                where: { name: brandName },
                transaction: t
            })

            // Create data to vehicle_types table using foreignKey
            const [vehicleType] = await VehicleType.findOrCreate({
                where: { name: typeName },
                transaction: t
            })

            // Create data to vehicle_models table using foreignKey
            const [vehicleModel] = await VehicleModel.findOrCreate({
                where: { name: modelName },
                transaction: t
            })

            // Create data to vehicle_years table
            const [vehicleYear] = await VehicleYear.findOrCreate({
                where: { year },
                transaction: t
            })

            // Create data to pricelist
            await Pricelist.create(
                { yearId: vehicleYear.yearId, modelId: vehicleModel.modelId },
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
        const { limit = 10, skip = 0 } = req.query

        const totalCount = await VehicleBrand.count()

        const vehicleBrands = await VehicleBrand.findAll({
            limit: parseInt(limit),
            offset: parseInt(skip)
        })

        const totalPages = Math.ceil(totalCount / limit)

        const response = {
            total: totalCount,
            limit: parseInt(limit),
            skip: parseInt(skip),
            totalPages: totalPages,
            data: vehicleBrands
        }

        res.status(200).json({
            message: "Get vehicle brands is success",
            response
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

        if(!vehicleBrand) {
            return res.status(404).json({
                message: 'Vehicle brand not found'
            })
        }

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
        const { limit = 10, skip = 0 } = req.query

        const totalCount = await VehicleType.count()

        const vehicleTypes = await VehicleType.findAll({
            limit: parseInt(limit),
            offset: parseInt(skip)
        })

        const totalPages = Math.ceil(totalCount / limit)

        const response = {
            total: totalCount,
            limit: parseInt(limit),
            skip: parseInt(skip),
            totalPages: totalPages,
            data: vehicleTypes
        }

        res.status(200).json({
            message: 'Get vehicle types is success',
            response
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

        if(!vehicleType) {
            return res.status(404).json({
                message: 'Vehicle type not found'
            })
        }

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

// GET /vehicle-models
const getVehicleModels = async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query

        const totalCount = await VehicleModel.count()

        const vehicleModels = await VehicleModel.findAll({
            limit: parseInt(limit),
            offset: parseInt(skip)
        })

        const totalPages = Math.ceil(totalCount / limit)

        const response = {
            total: totalCount,
            limit: parseInt(limit),
            skip: parseInt(skip),
            totalPages: totalPages,
            data: vehicleModels
        }

        res.status(200).json({
            message: 'Get vehicle models is success',
            response
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-models/:id
const getVehicleModelById = async (req, res) => {
    const { id } = req.params

    try {
        const vehicleModel = await VehicleModel.findByPk(id, {
            attributes: ['name', 'id']
        })

        if(!vehicleModel) {
            return res.status(404).json({
                message: 'Vehicle model not found'
            })
        }

        res.status(200).json({
            message: 'Get vehicle model is success',
            data: vehicleModel
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-years
const getVehicleYears = async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query

        const totalCount = await VehicleYear.count()

        const vehicleYears = await VehicleYear.findAll({
            limit: parseInt(limit),
            offset: parseInt(skip)
        })

        const totalPages = Math.ceil(totalCount / limit)

        const response = {
            total: totalCount,
            limit: parseInt(limit),
            skip: parseInt(skip),
            totalPages: totalPages,
            data: vehicleYears
        }

        res.status(200).json({
            message: 'Get vehicle years is success',
            response
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-years/:id
const getVehicleYearById = async (req, res) => {
    const { id } = req.params

    try {
        const vehicleYear = await VehicleYear.findByPk(id, {
            attributes: ['year', 'id']
        })

        if(!vehicleYear) {
            return res.status(404).json({
                message: 'Vehicle year not found'
            })
        }

        res.status(200).json({
            message: 'Get vehicle year is success',
            data: vehicleYear
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /pricelist/:id
const getPricelistById = async (req, res) => {
    const { id } = req.params

    try {
        const pricelist = await Pricelist.findByPk(id)

        if(!pricelist) {
            return res.status(404).json({
                message: 'Pricelist not found'
            })
        }

        res.status(200).json({
            message: 'Get pricelist is success',
            data: pricelist
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
    getVehicleTypeById,
    getVehicleModels,
    getVehicleModelById,
    getVehicleYears,
    getVehicleYearById,
    getPricelistById
}
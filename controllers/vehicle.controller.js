const VehicleBrand = require('../models/VehicleBrand')
const VehicleType = require('../models/VehicleType')
const VehicleModel = require('../models/VehicleModel')
const VehicleYear = require('../models/VehicleYear')
const Pricelist = require('../models/Pricelist')

// POST /vehicle-brands
const createNewBrand = async (req, res) => {
    const { name } = req.body

    try {
        // Find brand in the database
        const existingBrand = await VehicleBrand.findOne({ where: { name }})

        // Send error response if brand already exists
        if(existingBrand) {
            return res.status(400).json({
                message: 'Brand already exists'
            })
        }

        // Create new brand
        const newBrand = await VehicleBrand.create({
            name: name
        })

        // Send success response
        res.status(201).json({
            message: 'Add brand is success',
            data: newBrand
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-brands
const getAllBrands = async (req, res) => {
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
            message: "Get all brands is success",
            response
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// DELETE /vehicle-brands/:id
const deleteBrand = async (req, res) => {
    const { id } = req.params

    try {
        // Find brand by ID in the database
        const brand = await VehicleBrand.findByPk(id)

        // Send error response if brand not found
        if(!brand) {
            return res.status(404).json({
                message: 'brand not found'
            })
        }

        // Delete brand from database
        await VehicleBrand.destroy({ where: { id }})

        // Send success response
        res.status(200).json({
            message: 'Brand is deleted',
            data: brand
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// POST /vehicle-types
const createVehicleType = async (req, res) => {
    const { name } = req.body

    try {
        const user = await VehicleType.create({
            name: name
        })

        res.status(201).json({
            message: 'Add vehicle brand is success',
            data: user
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
    createNewBrand,
    getAllBrands,
    deleteBrand,
    getVehicleTypes,
    getVehicleTypeById,
    getVehicleModels,
    getVehicleModelById,
    getVehicleYears,
    getVehicleYearById,
    getPricelistById
}
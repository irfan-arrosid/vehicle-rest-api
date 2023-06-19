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
const createNewType = async (req, res) => {
    const { name, VehicleBrandId } = req.body

    try {
        // Find both type and VehicleBrandId in the database
        const findTypeAndBrandId = await VehicleType.findOne({
            where: {
                name: name,
                VehicleBrandId: VehicleBrandId
            }
        })
        
        // Send error response if type already exists
        if(findTypeAndBrandId) {
            return res.status(400).json({
                message: 'Type already exists',
            })
        }

        // Find VehicleBrandId in the database
        const findBrandId = await VehicleBrand.findByPk(VehicleBrandId)

        // Send error response if brand_id not found
        if(!findBrandId) {
            return res.status(404).json({
                message: 'Brand not found'
            })
        }

        // Create new type
        const newType = await VehicleType.create({
            name: name,
            VehicleBrandId: VehicleBrandId
        })

        // Send success response
        res.status(201).json({
            message: 'Add type is success',
            data: newType
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// GET /vehicle-types
const getAllTypes = async (req, res) => {
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
            message: 'Get all types is success',
            response
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        })
        console.error(error);
    }
}

// DELETE /vehicle-types/:id
const deleteType = async (req, res) => {
    const { id } = req.params

    try {
        // Find type by ID in the database
        const type = await VehicleType.findByPk(id)

        // Send error response if type not found
        if(!type) {
            return res.status(404).json({
                message: 'Type not found'
            })
        }

        // Delete type from database
        await VehicleType.destroy({ where: { id }})

        // Send success response
        res.status(200).json({
            message: 'Type is deleted',
            data: type
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
    createNewType,
    getAllTypes,
    deleteType,
    getVehicleModels,
    getVehicleModelById,
    getVehicleYears,
    getVehicleYearById,
    getPricelistById
}
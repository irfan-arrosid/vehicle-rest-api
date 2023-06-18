const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const VehicleBrand = sequelize.define(
    'VehicleBrand',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'vehicle_brands',
        timestamps: false,
    }
)

module.exports = VehicleBrand
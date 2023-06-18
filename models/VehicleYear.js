const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const VehicleYear = sequelize.define(
    'VehicleYear',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'vehicle_years',
        timestamps: false,
    }
)

module.exports = VehicleYear
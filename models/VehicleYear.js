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
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'vehicle_years',
        timestamps: false,
    }
)

module.exports = VehicleYear
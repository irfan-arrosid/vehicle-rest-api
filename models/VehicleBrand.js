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
        tableName: 'vehicle_brands',
        timestamps: false,
    }
)

module.exports = VehicleBrand
const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const VehicleBrand = require('./VehicleBrand')

const VehicleType = sequelize.define(
    'VehicleType',
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
        brand_id: {
            type: DataTypes.BIGINT,
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
        tableName: 'vehicle_types',
        timestamps: false,
    }
)

VehicleType.belongsTo(VehicleBrand, { foreignKey: 'brand_id' })

module.exports = VehicleType
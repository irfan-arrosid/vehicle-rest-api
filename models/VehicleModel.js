const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const VehicleType = require('./VehicleType')

const VehicleModel = sequelize.define(
    'VehicleModel',
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
        type_id: {
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
        tableName: 'vehicle_models',
        timestamps: false,
    }
)

VehicleModel.belongsTo(VehicleType, { foreignKey: 'type_id' })

module.exports = VehicleModel
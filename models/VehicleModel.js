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
        // type_id: {
        //     type: DataTypes.BIGINT,
        // },
    },
    {
        tableName: 'vehicle_models',
        timestamps: false,
    }
)

// VehicleType.hasMany(VehicleModel, {foreignKey: 'type_id'})
VehicleType.hasMany(VehicleModel)
VehicleModel.belongsTo(VehicleType)

module.exports = VehicleModel
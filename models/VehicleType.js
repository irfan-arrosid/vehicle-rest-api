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
        // brand_id: {
        //     type: DataTypes.BIGINT,
        // },
    },
    {
        tableName: 'vehicle_types',
        timestamps: false,
    }
)

VehicleBrand.hasMany(VehicleType, {foreignKey: 'brand_id'})
VehicleType.belongsTo(VehicleBrand)

module.exports = VehicleType
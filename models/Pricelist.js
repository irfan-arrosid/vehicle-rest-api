const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const VehicleYear = require('./VehicleYear')
const VehicleModel = require('./VehicleModel')

const Pricelist = sequelize.define(
    'Pricelist',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        year_id: {
            type: DataTypes.BIGINT,
        },
        model_id: {
            type: DataTypes.BIGINT,
        },
    },
    {
        tableName: 'pricelist',
        timestamps: false,
    }
)

Pricelist.belongsTo(VehicleYear, { foreignKey: 'year_id' })
Pricelist.belongsTo(VehicleModel, { foreignKey: 'model_id' })

module.exports = Pricelist
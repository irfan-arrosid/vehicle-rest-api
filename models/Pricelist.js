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
            autoIncrement: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        // year_id: {
        //     type: DataTypes.BIGINT,
        //     references: {
        //         model:  VehicleYear,
        //         key: 'id'
        //     }
        // },
        // model_id: {
        //     type: DataTypes.BIGINT,
        //     references: {
        //         model:  VehicleModel,
        //         key: 'id'
        //     }
        // },
    },
    {
        tableName: 'pricelist',
        timestamps: false
    }
)

VehicleModel.belongsToMany(VehicleYear, {through: Pricelist})
VehicleYear.belongsToMany(VehicleModel, {through: Pricelist})

module.exports = Pricelist
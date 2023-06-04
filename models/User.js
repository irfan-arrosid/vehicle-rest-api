const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const jwt = require('jsonwebtoken')

const User = sequelize.define(
    'User',
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
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        tableName: 'users',
        timestamps: false,
    }
)

User.prototype.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id, name: this.name, is_admin: this.is_admin }, 'asj292jsau92js81kak0al0')
}

module.exports = User
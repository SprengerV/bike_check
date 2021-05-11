const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Bike extends Model {};

Bike.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.TEXT,
            references: {
                model: User,
                key: 'id'
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        updated: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'bikes'
    }
);

module.exports = Bike;

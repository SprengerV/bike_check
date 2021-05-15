const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Bike extends Model {};

Bike.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: 'id'
            }
        },
        title: {
            type: DataTypes.String [1, 28],
            allowNull: false
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

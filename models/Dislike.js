const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Bike = require('./Bike');
const User = require('./User');

class Dislike extends Model {};

Dislike.init(
    {
        bikeId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Bike,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'dislikes'
    }
);

module.exports = Dislike;
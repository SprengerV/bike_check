const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Bike = require('./Bike');
const User = require('./User');

class Photo extends Model {};

Photo.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        bikeId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Bike,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: User,
                key: 'id'
            }
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        uploaded: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'photos'
    }
);

module.exports = Photo;
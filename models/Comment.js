const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Bike = require('./Bike');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        bikeId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Bike,
                key: 'id'
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'comments'
    }
);

module.exports = Comment;
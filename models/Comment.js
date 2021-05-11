const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        userId: {
            type: DataTypes.TEXT,
            allowNull: false
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
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'comments'
    }
);

module.exports = Comment;
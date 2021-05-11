const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = require('./Comment');
const User = require('./User');

class Like extends Model {};

Model.init(
    {
        commentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Comment,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.TEXT,
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
        modelName: 'likes'
    }
);

module.exports = Like;
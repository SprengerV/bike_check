const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {};

User.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'http://getdrawings.com/profile-icon#profile-icon-56.png'
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'users'
    }
);

module.exports = User;
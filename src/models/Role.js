const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

// Role model
const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'roles',
    timestamps: true,
});


module.exports = Role;
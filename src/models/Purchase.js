const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Purchase = sequelize.define('purchase', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    date: DataTypes.STRING,
    total: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'shipped', 'cancelled', 'incomplete'), 
        defaultValue: 'pending', 
        allowNull: false 
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
});


module.exports = Purchase;
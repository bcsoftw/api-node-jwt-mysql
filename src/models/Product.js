const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    technology: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    discount: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
});

module.exports = Product;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Purchase = require('./Purchase');
const Product = require('./Product');

const Purchase_Item = sequelize.define('purchase_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    amount: { type: DataTypes.INTEGER, allowNull: true },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
    },
    purchaseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Purchase,
            key: 'id',
        },
    },
});


module.exports = Purchase_Item;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role');
const Parent_Menu = require('./Parent_Menu');


const Permission = sequelize.define('permission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    agregar: {
        type: DataTypes.BOOLEAN,
    },
    editar: {
        type: DataTypes.BOOLEAN,
    },
    ver: {
        type: DataTypes.BOOLEAN,
    },
    inhabilitar: {
        type: DataTypes.BOOLEAN,
    },
    borrar: {
        type: DataTypes.BOOLEAN,
    },
    pagar: {
        type: DataTypes.BOOLEAN,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id',
        },
    },
    parentMenuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Parent_Menu,
            key: 'id',
        },
    },
});



module.exports = Permission;
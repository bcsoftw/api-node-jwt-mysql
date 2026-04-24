const sequelize = require('../config/db');
const Role = require('./Role');
const User = require('./User');

const Parent_Menu = require('./Parent_Menu');
const Product = require('./Product');
const Permission = require('./Permission');
const Purchase = require('./Purchase');
const Purchase_Item = require('./Purchase_Item');

// Definir asociaciones
Role.hasMany(User, { foreignKey: 'roleId'});
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' }); 
Role.hasMany(Permission, { foreignKey: 'roleId', as: 'permissions' }); 
Parent_Menu.hasMany(Permission, { foreignKey: 'parentMenuId' });
Permission.belongsTo(Role, { foreignKey: 'roleId' }); 
Permission.belongsTo(Parent_Menu, { foreignKey: 'parentMenuId', as: 'parentMenu' }); 

User.hasMany(Purchase, { foreignKey: 'userId' });

Purchase.belongsTo(User, {
    foreignKey: 'userId',  
    as: 'user',
});
Purchase.hasMany(Purchase_Item, { foreignKey: 'purchaseId', as: 'products' });

Product.hasMany(Purchase_Item, { foreignKey: 'productId' });

Purchase_Item.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Purchase_Item.belongsTo(Purchase, { foreignKey: 'purchaseId' });

//Sincronizar modelos con la DB (solo en desarrollo)


// sequelize.sync({ alter: true }).then(() => {
//     console.log('Modelos sincronizados');
// });

module.exports = { sequelize, Role, User, Parent_Menu, Permission, Product, Purchase, Purchase_Item };
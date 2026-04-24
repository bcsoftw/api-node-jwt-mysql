const { Sequelize } = require('sequelize');
require('dotenv').config();




// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'mysql',
//         dialectModule: require('mysql2'),
//         dialectOptions: {
//             ssl: false, // Requerido por la mayoría de proveedores en la nube
//         },
//         port: process.env.DB_PORT || 3306,
//         // logging: false, // Desactivar logs en producción
//         pool: {
//             max: 10,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// );

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql', // o 'postgres'
        dialectModule: require('mysql2'),
        port: process.env.DB_PORT || 3306,
        // ssl: true,
        pool: {
            max: 2,          // Bajo para serverless
            min: 0,
            acquire: 30000,  // 30 segundos para adquirir conexión
            idle: 10000       // Cerrar conexiones inactivas rápido
        },
        dialectOptions: {
            connectTimeout: 60000, // Tiempo para el handshake inicial
        }
    }
);
module.exports = sequelize;



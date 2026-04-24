// 'use strict';

// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         await queryInterface.bulkInsert('Products', [
//             {
//                 name: 'Smartphone X',
//                 technology: '5G',
//                 description: 'Latest smartphone with advanced features',
//                 discount: '10%',
//                 price: 999.99,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 name: 'Laptop Pro',
//                 technology: 'Intel i7',
//                 description: 'High-performance laptop for professionals',
//                 discount: '15%',
//                 price: 1499.99,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 name: 'Wireless Headphones',
//                 technology: 'Bluetooth 5.0',
//                 description: 'Noise-cancelling wireless headphones',
//                 discount: '5%',
//                 price: 199.99,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 name: 'Smart TV 4K',
//                 technology: 'OLED',
//                 description: 'Ultra HD smart TV with streaming capabilities',
//                 discount: '20%',
//                 price: 799.99,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             },
//             {
//                 name: 'Gaming Console',
//                 technology: 'Next-Gen',
//                 description: 'Powerful gaming console for immersive experiences',
//                 discount: '0%',
//                 price: 499.99,
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             }
//         ], {});
//     },

//     down: async (queryInterface, Sequelize) => {
//         await queryInterface.bulkDelete('Products', null, {});
//     }
// };



require('dotenv').config();
const db = require('../config/db');
const Product = require('../models/Product');


const products = [
    {
        name: 'Smartphone X',
        technology: '5G',
        description: 'Latest smartphone with advanced features',
        discount: '10%',
        price: 999.99,

    },
    {
        name: 'Laptop Pro',
        technology: 'Intel i7',
        description: 'High-performance laptop for professionals',
        discount: '15%',
        price: 1499.99,

    },
    {
        name: 'Wireless Headphones',
        technology: 'Bluetooth 5.0',
        description: 'Noise-cancelling wireless headphones',
        discount: '5%',
        price: 199.99,

    },
    {
        name: 'Smart TV 4K',
        technology: 'OLED',
        description: 'Ultra HD smart TV with streaming capabilities',
        discount: '20%',
        price: 799.99,

    },
    {
        name: 'Gaming Console',
        technology: 'Next-Gen',
        description: 'Powerful gaming console for immersive experiences',
        discount: '0%',
        price: 499.99,

    }

];

// Función para ejecutar el seeder
async function seedProducts() {
    try {
        // Conectar a la DB
        await db.authenticate();
        console.log('Conectado a la base de datos. Iniciando seeder de products...');

        for (const product of products) {

            const existingProduct = await Product.findOne({ where: { name: product.name } });

            if (existingProduct) {
                console.log(`Product con name ${product.name} ya existe. Saltando...`);
                continue;
            }

            await Product.create({
                name: product.name,
                technology: product.technology,
                description: product.description,
                discount: product.discount,
                price: product.price,
            });

            console.log(`Product ${product.name} insertado exitosamente.`);
        }

        console.log('Seeder de products completado.');
        process.exit(0); // Salir del proceso
    } catch (error) {
        console.error('Error en el seeder de products:', error);
        process.exit(1);
    }
}

// Ejecutar el seeder
seedProducts();
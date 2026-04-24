require('dotenv').config();
const db = require('../config/db');
const Parent_Menu = require('../models/Parent_Menu');


const parentMenus = [
    {
        name: 'Dashboard',
    },
    {
        name: 'Products',
    },
    {
        name: 'Orders',
    },
    {
        name: 'Configuración',
    },
    {
        name: 'Users',
    },
    {
        name: 'Roles',
    },

];

// Función para ejecutar el seeder
async function seedParentMenus() {
    try {
        // Conectar a la DB
        await db.authenticate();
        console.log('Conectado a la base de datos. Iniciando seeder de parentMenus...');

        for (const parent of parentMenus) {

            const existingParentMenus = await Parent_Menu.findOne({ where: { name: parent.name } });

            if (existingParentMenus) {
                console.log(`Parent_Menu con name ${parent.name} ya existe. Saltando...`);
                continue;
            }

            await Parent_Menu.create({
                name: parent.name,
            });

            console.log(`ParentMenu ${parent.name} insertado exitosamente.`);
        }

        console.log('Seeder de parentMenus completado.');
        process.exit(0); // Salir del proceso
    } catch (error) {
        console.error('Error en el seeder de parentMenus:', error);
        process.exit(1);
    }
}

// Ejecutar el seeder
seedParentMenus();
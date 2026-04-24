require('dotenv').config();
const db = require('../config/db');
const Role = require('../models/Role');


const roles = [
    {
        name: 'Super Admin',
    },
    {
        name: 'Admin',
    },
    {
        name: 'Customer',
    },

];

// Función para ejecutar el seeder
async function seedRoles() {
    try {
        // Conectar a la DB
        await db.authenticate();
        console.log('Conectado a la base de datos. Iniciando seeder de usuarios...');

        for (const role of roles) {

            const existingRole = await Role.findOne({ where: { name: role.name } });

            if (existingRole) {
                console.log(`Role con name ${role.name} ya existe. Saltando...`);
                continue;
            }

            await Role.create({
                name: role.name,  
            });

            console.log(`Usuario ${role.name} insertado exitosamente.`);
        }

        console.log('Seeder de roles completado.');
        process.exit(0); // Salir del proceso
    } catch (error) {
        console.error('Error en el seeder de roles:', error);
        process.exit(1);
    }
}

// Ejecutar el seeder
seedRoles();
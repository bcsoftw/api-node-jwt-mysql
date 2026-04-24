require('dotenv').config(); 
const bcrypt = require('bcryptjs');
const db = require('../config/db'); 
const User = require('../models/User');


const users = [
    {
        name: 'Super Admin',
        email: 'super@example.com',
        password: '741852963.', 
        roleId: 1,
    },
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '12345678', 
        roleId: 2,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: '12345678',
        roleId: 3,
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '12345678',
        roleId: 3,
    }
];

// Función para ejecutar el seeder
async function seedUsers() {
    try {
        // Conectar a la DB
        await db.authenticate();
        console.log('Conectado a la base de datos. Iniciando seeder de usuarios...');

        for (const user of users) {

            const existingUser = await User.findOne({ where: { email: user.email } });

            if (existingUser) {
                console.log(`Usuario con email ${user.email} ya existe. Saltando...`);
                continue;
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(user.password, 10);

            await User.create({
                name: user.name,
                email: user.email,
                password: hashedPassword,
                roleId: user.roleId,
            });

            console.log(`Usuario ${user.username} insertado exitosamente.`);
        }

        console.log('Seeder de usuarios completado.');
        process.exit(0); // Salir del proceso
    } catch (error) {
        console.error('Error en el seeder de usuarios:', error);
        process.exit(1);
    }
}

// Ejecutar el seeder
seedUsers();
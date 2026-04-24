require('dotenv').config();
const db = require('../config/db');
const Permission = require('../models/Permission');


const permissions = [
    {
        roleId : 1,
        parentMenuId : 1,
        agregar : 1,
        editar : 1,
        ver : 1,
        inhabilitar : 0,
        borrar: 1,
        pagar : 0,
    },
    {
        roleId: 1,
        parentMenuId: 2,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,

    },
    {
        roleId: 1,
        parentMenuId: 3,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 1,

    },
    {
        roleId: 1,
        parentMenuId: 4,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,
    },
    {
        roleId: 1,
        parentMenuId: 5,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 1,
        borrar: 1,
        pagar: 0,
    },
    {
        roleId: 1,
        parentMenuId: 6,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,
    },




    {
        roleId : 2,
        parentMenuId : 1,
        agregar : 1,
        editar : 1,
        ver : 1,
        inhabilitar : 0,
        borrar: 1,
        pagar : 0,
    },
    {
        roleId: 2,
        parentMenuId: 2,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,

    },
    {
        roleId: 2,
        parentMenuId: 3,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 1,

    },
    {
        roleId: 2,
        parentMenuId: 4,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,
    },
    {
        roleId: 2,
        parentMenuId: 5,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 1,
        borrar: 1,
        pagar: 0,
    },
    {
        roleId: 2,
        parentMenuId: 6,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 0,
        pagar: 0,
    },





    {
        roleId: 3,
        parentMenuId: 1,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,
    },
    {
        roleId: 3,
        parentMenuId: 2,
        agregar: 0,
        editar: 0,
        ver: 1,
        inhabilitar: 0,
        borrar: 0,
        pagar: 0,

    },
    {
        roleId: 3,
        parentMenuId: 3,
        agregar: 1,
        editar: 1,
        ver: 1,
        inhabilitar: 0,
        borrar: 0,
        pagar: 1,

    },
    {
        roleId: 3,
        parentMenuId: 4,
        agregar: 1,
        editar: 1,
        ver: 0,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,
    },
    {
        roleId: 3,
        parentMenuId: 5,
        agregar: 1,
        editar: 1,
        ver: 0,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,
    },
    {
        roleId: 3,
        parentMenuId: 6,
        agregar: 1,
        editar: 1,
        ver: 0,
        inhabilitar: 0,
        borrar: 1,
        pagar: 0,
    }

];

// Función para ejecutar el seeder
async function seedPermissions() {
    try {
        // Conectar a la DB
        await db.authenticate();
        console.log('Conectado a la base de datos. Iniciando seeder de permissions...');

        for (const permission of permissions) {

            // const existingPermission = await Permission.findOne({ where: { id: permission.id } });

            // if (existingPermission) {
            //     console.log(`Product con name ${permission.id} ya existe. Saltando...`);
            //     continue;
            // }

            await Permission.create({

                roleId: permission.roleId,
                parentMenuId: permission.parentMenuId,
                agregar: permission.agregar,
                editar: permission.editar,
                ver: permission.ver,
                inhabilitar: permission.inhabilitar,
                borrar: permission.borrar,
                pagar: permission.pagar,

            });

            console.log(`Permission ${permission.id} insertado exitosamente.`);
        }

        console.log('Seeder de permissions completado.');
        process.exit(0); // Salir del proceso
    } catch (error) {
        console.error('Error en el seeder de permissions:', error);
        process.exit(1);
    }
}

// Ejecutar el seeder
seedPermissions();
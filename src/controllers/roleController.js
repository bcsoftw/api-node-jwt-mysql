const Role = require('../models/Role');
const Permission = require('../models/Permission');
const Parent_Menu = require('../models/Parent_Menu');
const ResponseTrait = require('../traits/ResponseTrait');
const responseTrait = new ResponseTrait();
const { Op } = require('sequelize');


exports.getAllRole = async (req, res) => {
    try {

        if (!req.user || !req.user.id) {
            return responseTrait.responseError(res, null, 'User not authenticated');
        }

        const isAdmin = req.user.id === 2;
        const whereClause = isAdmin ? { id: { [Op.not]: 1 } } : {};

        const role = await Role.findAll({
            where: whereClause
        });

        responseTrait.responseSuccess(res, role,'Role List Fetch Successfully !');
    } catch (err) {
        responseTrait.responseError(res, null, 'Error listing roles');
    }
};

exports.createRole = async (req, res) => {

    const { name, permissions } = req.body;

    try {
        const role = await Role.create({ name });

        const permisosData = permissions.map(item => ({
            roleId: role.id,
            parentMenuId: item.parentMenuId,
            agregar: item.agregar,
            editar: item.editar,
            ver: item.ver,
            inhabilitar: item.inhabilitar,
            borrar: item.borrar,
            pagar: item.pagar,

        }));

        await Permission.bulkCreate(permisosData);
        responseTrait.responseSuccess(res, role, 'New Role Created Successfully !');

    } catch (err) {
        responseTrait.responseError(res, null, 'Error listing role');
    }
};

exports.showRole = async (req, res) => {
    try {


        const role = await Role.findOne({
            where: { id: req.params.id },
            include: [{
                model: Permission,  
                as: 'permissions',
                include: [{
                    model: Parent_Menu,
                    as: 'parentMenu'
                }],
            }]
        });

        if (role) {
            responseTrait.responseSuccess(res, role, 'Role Details Fetch Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Role Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err.message);
    }
};


exports.updateRole = async (req, res) => {

    const { name, permissions } = req.body;
    const roleId = req.params.id;

    try {
        const role = await Role.update({ name }, { where: { id: req.params.id } });
 
        if (role) {

            //Eliminando permisos asociados a este role
            await Permission.destroy({
                where: {
                    roleId: roleId
                }
            });

            //Agregando nuevos permisos
            const permisosData = permissions.map(item => ({
                roleId: roleId,
                parentMenuId: item.parentMenuId,
                agregar: item.agregar,
                editar: item.editar,
                ver: item.ver,
                inhabilitar: item.inhabilitar,
                borrar: item.borrar,
                pagar: item.pagar,

            }));

            await Permission.bulkCreate(permisosData);

            const roleData = await Role.findOne({
                where: { id: req.params.id },
                include: [{
                    model: Permission,
                    as: 'permissions',
                }]
            });



            responseTrait.responseSuccess(res, roleData, 'Role Updated Successfully !');

        } else {
            responseTrait.responseError(res, null, 'Role Not Found');
        }
        
    } catch (err) {
         responseTrait.responseError(res, err);
    }
};


exports.deleteRole= async (req, res) => {
    try {
        const role = await Role.destroy({ where: { id: req.params.id } });
        if (role) {
            responseTrait.responseSuccess(res, null, 'Role Deleted Successfully !');
        } else {
            responseTrait.responseError(res, null, 'Role Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};

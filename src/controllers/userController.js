const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const ResponseTrait = require('../traits/ResponseTrait');
const responseTrait = new ResponseTrait();
const { Op } = require('sequelize');
const { fn, col } = require('sequelize');

exports.getAllUsers = async (req, res) => {
    try {
     
        const isAdmin = req.user.id === 2;
        const whereClause = isAdmin ? { id: { [Op.not]: 1 } } : {};
        
        const users = await User.findAll({
            where: whereClause,
            include: [{ model: Role, as: 'role' }]
        });

        responseTrait.responseSuccess(res, users,'User List Fetch Successfully !');
    } catch (err) {
        responseTrait.responseError(res, null, 'Error listing users');
    }
};

exports.createUsers = async (req, res) => {
    const { name, password, email, roleId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, password: hashedPassword, email, roleId });
        if (user) {
            // const userCreate = await User.findOne({ where: { email: email }, include: [{ model: Role, as: 'role' }] });


      
            const [userCreate, users] = await Promise.all([
                User.findOne({ where: { email: email }, include: [{ model: Role, as: 'role' }] }),
                User.findAll({
                    attributes: ['id', 'name', 'email', 'activo', 'createdAt'], 
                    include: [{
                        model: Role,
                        as: 'role',
                        attributes: ['id', 'name'] 
                    }]
                })
            ]);



            responseTrait.responseSuccess(res, { user: userCreate, users }, 'User Updated Successfully !');
        }
    } catch (err) {
        responseTrait.responseError(res, null, 'Error listing users');
    }
};

exports.showUsers = async (req, res) => {
    try {

        const user = await User.findOne({
            where: { id: req.params.id },
            include: [{
                model: Role,
                as:'role',
                include: [{
                    model: Permission,
                    as: 'permissions'
                }]
            }]
        });

        if (user) {
            responseTrait.responseSuccess(res, user, 'User Details Fetch Successfully !');
        } else {
            responseTrait.responseError(res, null, 'User Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};


exports.updateUsers = async (req, res) => {
    const { name, password, email, roleId, newPassword } = req.body;

    try {

        // Busca el usuario existente
        const searchUser = await User.findOne({
            where: { id: req.params.id },
        });

        if (!searchUser) {
            responseTrait.responseError(res, null, 'User Not Found');
        }

        // Prepara los campos a actualizar (excluye password si no se proporciona)
        const updateData = {};
        if (name != undefined) updateData.name = name;
        if (email != undefined) updateData.email = email;
        if (roleId != undefined) updateData.roleId = roleId;


        if (newPassword != undefined) updateData.password = await bcrypt.hash(newPassword, 10); //lo nuevo

        // Actualiza el usuario (el hook se ejecuta automáticamente)
        const user = await User.update(updateData, { where: { id: req.params.id } });

        if (user) {
            const userUpdate = await User.findOne({ where: { id: req.params.id }, include: [{ model: Role, as:'role' }] });
            responseTrait.responseSuccess(res, userUpdate, 'User Updated Successfully !');
        }
        
    } catch (err) {
        responseTrait.responseError(res, err.message);
    }
};


exports.deleteUsers = async (req, res) => {
    try {
        const user = await User.destroy({ where: { id: req.params.id } });
        if (user) {
            responseTrait.responseSuccess(res, null, 'User Deleted Successfully !');
        } else {
            responseTrait.responseError(res, null, 'User Not Found');
        }
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};

exports.statusUsers = async (req, res) => {

    try {

        const { id } = req.params;

        // Verificar y actualizar en una sola consulta
        const [updatedCount] = await User.update(
            { activo: fn('NOT', col('activo')) },
            { where: { id } }
        );

        if (updatedCount === 0) {
            return responseTrait.responseError(res, null, 'User Not Found');
        }

   
        const [user, users] = await Promise.all([
            User.findByPk(id, {
                include: [{ model: Role, as: 'role' }]
            }),
            User.findAll({
                attributes: ['id', 'name', 'email', 'activo', 'createdAt'],
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name'] 
                }]
            })
        ]);
       

        responseTrait.responseSuccess(res, { user, users }, 'User status updated successfully !');
        
    } catch (err) {
        responseTrait.responseError(res, err);
    }
};

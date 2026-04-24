const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');
const ResponseTrait = require('../traits/ResponseTrait');
const responseTrait = new ResponseTrait();
const db = require('../config/db');


exports.register = async (req, res) => {
    const { name, password, email } = req.body;
    const transaction = await db.transaction();
    
    try {

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Usuario ya existe' });
        }
        
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await User.create({ name, password: hashedPassword, email, roleId: 3 }, { transaction });
        const userRole = 3;
        // req.session.userId = user.id;

        // Generar JWT (login automático)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: userRole },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Obtén el usuario con permisos
        const userWithAssociations = await User.findByPk(user.id, {
            include: [{
                model: Role,
                as:'role',
                include: [{
                    model: Permission,
                    as: 'permissions'
                }]
            }],
            transaction
        });


        await transaction.commit();
        const data = { token, user: userWithAssociations };
        responseTrait.responseSuccess(res, data, 'User Registered y Logged in Successfully', 201);
    } catch (err) {
        await transaction.rollback();
        responseTrait.responseError(res, err.message, 'Error registering user');
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar al usuario por email
        const user = await User.findOne({
            where: { email },
            include: [{
                model: Role,
                as:'role',
                include: [{
                    model: Permission,
                    as: 'permissions'
                }]
            }]
        });

        if (!user) {
            responseTrait.responseError(res, null, 'User not found');
        }

        // Comparar la contraseña proporcionada con la hasheada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            responseTrait.responseError(res, null, 'Invalid Password !');
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const data = { token, user: user };
        responseTrait.responseSuccess(res, data,'Logged In Successfully !');

      
    } catch (error) {
        responseTrait.responseError(res, error.message, 'Internal server error');
    }
};


exports.me = async (req, res) => {
    try {
        const data = { user: req.user };
        responseTrait.responseSuccess(res, data, 'Authorized access');
    } catch (error) {
        return responseTrait.responseError(res, null, 'Access denied', 401); 
    }
};


exports.logout = async (req, res) => {

    try {
        // Destroy the session
        req.session.destroy((error) => {
            responseTrait.responseSuccess(res, null, 'Logged out successfully');
        });
        
    } catch (error) {
        responseTrait.responseError(res, error.message, 'Internal server error');
    }
};
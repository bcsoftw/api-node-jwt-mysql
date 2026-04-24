const express = require('express');
const { getAllUsers, createUsers, showUsers, updateUsers, deleteUsers, statusUsers } = require('../controllers/userController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get User List
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Get User List as Array' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/', verifyToken, getAllUsers);


/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *      - Users
 *     summary: Create New user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               password: { type: string }
 *               email: { type: string }
 *               roleId: { type: integer }
 *     responses:
 *       200: { description: 'Create New User' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.post('/', verifyToken, createUsers);


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Show User Details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the user to get'
 *     responses:
 *       200: { description: 'Show User Details' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/:id', verifyToken, showUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *      - Users
 *     summary: Update User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the user to update'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               password: { type: string }
 *               newPassword: { type: string }
 *               email: { type: string }
 *               roleId: { type: integer }
 *     responses:
 *       200: { description: 'Update User' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.put('/:id', verifyToken, updateUsers);


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *      - Users
 *     summary: Delete User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the user to update'
 *     responses:
 *       200: { description: 'Delete User' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.delete('/:id', verifyToken, deleteUsers);


/**
 * @swagger
 * /users/{id}/state:
 *   patch:
 *     tags:
 *      - Users
 *     summary: Update user status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the user to update'
 *     responses:
 *       200: { description: 'Update user status' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.patch('/:id/state', verifyToken, statusUsers);

module.exports = router;
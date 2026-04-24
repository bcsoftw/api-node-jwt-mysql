const express = require('express');
const { getAllRole, createRole, showRole, updateRole, deleteRole } = require('../controllers/roleController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /roles:
 *   get:
 *     tags:
 *      - Role
 *     summary: Get Role List
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Get role list as array' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/', verifyToken, getAllRole);


/**
 * @swagger
 * /roles:
 *   post:
 *     tags:
 *      - Role
 *     summary: Create New Role
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
 *               permissions: 
 *                 type: array
 *                 items: 
 *                     type: object
 *                     properties: 
 *                        agregar: {type: boolean}
 *                        editar: {type: boolean}
 *                        ver: {type: boolean}
 *                        inhabilitar: {type: boolean}
 *                        borrar: {type: boolean}
 *                        pagar: {type: boolean}
 *                        parentMenuId: {type: integer}        
 *     responses:
 *       200: { description: 'Create new role' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.post('/', verifyToken, createRole);


/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags:
 *      - Role
 *     summary: Show Role Details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the Role to get'
 *     responses:
 *       200: { description: 'Show role details' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/:id', verifyToken, showRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags:
 *      - Role
 *     summary: Update Role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the role to update'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               permissions: 
 *                 type: array
 *                 items: 
 *                     type: object
 *                     properties: 
 *                        agregar: {type: boolean}
 *                        editar: {type: boolean}
 *                        ver: {type: boolean}
 *                        inhabilitar: {type: boolean}
 *                        borrar: {type: boolean}
 *                        pagar: {type: boolean}
 *                        parentMenuId: {type: integer}       
 *     responses:
 *       200: { description: 'Update Role' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.put('/:id', verifyToken, updateRole);


/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags:
 *      - Role
 *     summary: Delete Role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the role to update'
 *     responses:
 *       200: { description: 'Delete Role' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.delete('/:id', verifyToken, deleteRole);




module.exports = router;
const express = require('express');
const { getAllPurchase, createPurchase, showPurchase, updatePurchase, deletePurchase, updateStatusPurchase, createPaymentIntent } = require('../controllers/purchaseController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /purchases:
 *   get:
 *     tags:
 *      - Purchase
 *     summary: Get Purchase List
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Get purchase list as array' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.get('/', verifyToken, getAllPurchase);


/**
 * @swagger
 * /purchases:
 *   post:
 *     tags:
 *      - Purchase
 *     summary: Create New Purchase
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderNumber: { type: string }
 *               date: { type: string }
 *               userId: { type: integer }
 *               total: { type: number }
 *               products: 
 *                 type: array
 *                 items: 
 *                     type: object
 *                     properties: 
 *                        amount: {type: integer}
 *                        price: {type: number}
 *                        productId: {type: integer}        
 *     responses:
 *       200: { description: 'Create new purchase' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.post('/', verifyToken, createPurchase);


/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     tags:
 *      - Purchase
 *     summary: Show Purchase Details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the Purchase to get'
 *     responses:
 *       200: { description: 'Show purchase details' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.get('/:id', verifyToken, showPurchase);

/**
 * @swagger
 * /purchases/{id}:
 *   put:
 *     tags:
 *      - Purchase
 *     summary: Update Purchase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the purchase to update'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderNumber: { type: string }
 *               date: { type: string }
 *               userId: { type: integer }
 *               total: { type: number }
 *               products: 
 *                 type: array
 *                 items: 
 *                     type: object
 *                     properties: 
 *                        amount: {type: integer}
 *                        price: {type: number}
 *                        productId: {type: integer}                    
 *     responses:
 *       200: { description: 'Update Purchase' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.put('/:id', verifyToken, updatePurchase);


/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     tags:
 *      - Purchase
 *     summary: Delete Purchase
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the purchase to update'
 *     responses:
 *       200: { description: 'Delete Purchase' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.delete('/:id', verifyToken, deletePurchase);


/**
 * @swagger
 * /purchases/{id}/status:
 *   put:
 *     tags:
 *      - Purchase
 *     summary: Update purchase status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the purchase to update status'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }

 *     responses:
 *       200: { description: 'Update purchase status' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.put('/:id/status', verifyToken, updateStatusPurchase);


/**
 * @swagger
 * /purchases/paymentIntent:
 *   post:
 *     tags:
 *      - Purchase
 *     summary: Create New Payment Intent 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount: { type: number }
 *               currency: { type: string }     
 *     responses:
 *       200: { description: 'Create new Payment Intent ' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.post('/paymentIntent', verifyToken, createPaymentIntent);

module.exports = router;
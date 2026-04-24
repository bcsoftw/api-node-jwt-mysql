const express = require('express');
const { getAllProduct, createProduct, showProduct, updateProduct, deleteProduct, productsPercentageSinceLastMonth} = require('../controllers/productController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *      - Products
 *     summary: Get Product List
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Get Product List as Array' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/', verifyToken, getAllProduct);


/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *      - Products
 *     summary: Create New Product
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
 *               technology: { type: string }
 *               description: { type: string }
 *               discount: { type: string }
 *               price: { type: number }
 *     responses:
 *       200: { description: 'Create New Product' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.post('/', verifyToken, createProduct);


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *      - Products
 *     summary: Show Product Details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the product to get'
 *     responses:
 *       200: { description: 'Show Product Details' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/:id', verifyToken, showProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *      - Products
 *     summary: Update Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the product to update'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               technology: { type: string }
 *               description: { type: string }
 *               discount: { type: string }
 *               price: { type: number }
 *     responses:
 *       200: { description: 'Update Product' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.put('/:id', verifyToken, updateProduct);


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *      - Products
 *     summary: Delete Product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: 'Numeric ID of the product to update'
 *     responses:
 *       200: { description: 'Delete Product' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
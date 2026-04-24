const express = require('express');
const { productsPercentageSinceLastMonth, usersPercentageSinceLastMonth } = require('../controllers/dashboardController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /dashboard/product-statistics:
 *   get:
 *     tags:
 *      - Dashboard
 *     summary: Products Percentage Since Last Month
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Products Percentage Since Last Month' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/product-statistics', verifyToken, productsPercentageSinceLastMonth);

/**
 * @swagger
 * /dashboard/user-statistics:
 *   get:
 *     tags:
 *      - Dashboard
 *     summary: Users Percentage Since Last Month
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Users Percentage Since Last Month' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Founds' }
 */
router.get('/user-statistics', verifyToken, usersPercentageSinceLastMonth);

module.exports = router;
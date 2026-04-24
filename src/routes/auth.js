const express = require('express');
const { register, login, logout, me } = require('../controllers/authController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /auth/sigup:
 *   post:
 *     tags:
 *      - UnAuthorize
 *       
 *     summary: SigUp
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
 *     responses:
 *       201: { description: 'SigUp' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.post('/sigup', register);

/**
 * @swagger
 * /auth/sigin:
 *   post:
 *     tags: 
 *       - UnAuthorize
 *     summary: SigIn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: 'SigIn' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.post('/sigin', login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *      - Authentication
 *     summary: Authenticated User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Authenticated User' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.get('/me', verifyToken, me);


/*

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Logout
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: 'Logout' }
 *       400: { description: 'Bad request' }
 *       404: { description: 'Resource Not Found' }
 */
router.post('/logout', verifyToken, logout);


module.exports = router;
import express from 'express';
import { processPayment } from '../controllers/payment.controller.js';
// import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing API
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Process payment for an order
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 64f0b2f9e4b0e5a1b4c9e8aa
 *     responses:
 *       200:
 *         description: Payment successful
 *       400:
 *         description: Payment failed
 */

// router.use(protect);

router.post('/', processPayment);

export default router;

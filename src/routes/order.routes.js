import express from 'express';
import { createOrder, getMyOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { orderValidator } from '../validators/order.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
// import { protect, admin } from '../middlewares/auth.middleware.js'; // To be added when auth is integrated

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get user's order history
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of user orders
 *   post:
 *     summary: Checkout cart and create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   street: { type: string, example: "123 Main St" }
 *                   city: { type: string, example: "New York" }
 *                   state: { type: string, example: "NY" }
 *                   country: { type: string, example: "USA" }
 *                   zipCode: { type: string, example: "10001" }
 *     responses:
 *       201:
 *         description: Order created successfully
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 example: "shipped"
 *     responses:
 *       200:
 *         description: Order status updated
 */

// router.use(protect);

router
  .route('/')
  .get(getMyOrders)
  .post(orderValidator.createOrder, validate, createOrder);

router
  .route('/:id')
  // .patch(admin, orderValidator.updateStatus, validate, updateOrderStatus);
  .patch(orderValidator.updateStatus, validate, updateOrderStatus);

export default router;

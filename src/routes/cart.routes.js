import express from 'express';
import { addItemToCart, getCart, removeItemFromCart } from '../controllers/cart.controller.js';
import { cartValidator } from '../validators/cart.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management API
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Returns the current user's cart
 *   post:
 *     summary: Add item to cart or update quantity
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f0b2f9e4b0e5a1b4c9e8aa
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       201:
 *         description: Cart created and item added
 */

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed and cart updated
 */

// Apply auth middleware
router.use(protect);

router
  .route('/')
  .get(getCart)
  .post(cartValidator.addItem, validate, addItemToCart);

router.route('/:productId').delete(removeItemFromCart);

export default router;

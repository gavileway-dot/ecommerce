import { Router } from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";
import { addToWishlistValidator, removeFromWishlistValidator } from "../validators/wishlist.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management endpoints
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get user wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist details
 */
router.get("/", getWishlist);

/**
 * @swagger
 * /api/wishlist/items:
 *   post:
 *     summary: Add an item to the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item added to wishlist
 */
router.post("/items", addToWishlistValidator, validate, addToWishlist);

/**
 * @swagger
 * /api/wishlist/items/{productId}:
 *   delete:
 *     summary: Remove an item from the wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from wishlist
 */
router.delete("/items/:productId", removeFromWishlistValidator, validate, removeFromWishlist);

export default router;
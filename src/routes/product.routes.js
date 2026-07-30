import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImages,
  removeProductImage,
} from "../controllers/product.controller.js";
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
  listProductsValidator,
  removeImageValidator,
} from "../validators/product.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import restrictTo from "../middlewares/role.middleware.js";
import { uploadProductImages } from "../middlewares/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               countInStock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.get("/", listProductsValidator, validate, getProducts);
router.post("/", protect, restrictTo("vendor", "admin"), createProductValidator, validate, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Product updated successfully
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.get("/:id", productIdValidator, validate, getProduct);
router.patch("/:id", protect, restrictTo("vendor", "admin"), updateProductValidator, validate, updateProduct);
router.delete("/:id", protect, restrictTo("vendor", "admin"), productIdValidator, validate, deleteProduct);

/**
 * @swagger
 * /api/products/{id}/images:
 *   post:
 *     summary: Add product images
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Images added successfully
 *   delete:
 *     summary: Remove a product image
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image removed successfully
 */
router.post("/:id/images", protect, restrictTo("vendor", "admin"), uploadProductImages, productIdValidator, validate, addProductImages);
router.delete("/:id/images", protect, restrictTo("vendor", "admin"), removeImageValidator, validate, removeProductImage);

export default router;
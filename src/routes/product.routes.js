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

// --- Public routes ---
router.get("/", listProductsValidator, validate, getProducts);
router.get("/:id", productIdValidator, validate, getProduct);

// --- Protected routes (vendor/admin only) ---
router.post("/", protect, restrictTo("vendor", "admin"), createProductValidator, validate, createProduct);
router.patch("/:id", protect, restrictTo("vendor", "admin"), updateProductValidator, validate, updateProduct);
router.delete("/:id", protect, restrictTo("vendor", "admin"), productIdValidator, validate, deleteProduct);
router.post("/:id/images", protect, restrictTo("vendor", "admin"), uploadProductImages, productIdValidator, validate, addProductImages);
router.delete("/:id/images", protect, restrictTo("vendor", "admin"), removeImageValidator, validate, removeProductImage);

export default router;
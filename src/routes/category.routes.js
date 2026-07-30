import { Router } from "express";
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";
import { createCategoryValidator, updateCategoryValidator, categoryIdValidator } from "../validators/category.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import restrictTo from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", getCategories);
router.get("/:id", categoryIdValidator, validate, getCategory);

router.post("/", protect, restrictTo("admin"), createCategoryValidator, validate, createCategory);
router.patch("/:id", protect, restrictTo("admin"), updateCategoryValidator, validate, updateCategory);
router.delete("/:id", protect, restrictTo("admin"), categoryIdValidator, validate, deleteCategory);

export default router;
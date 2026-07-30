import { body, param, query } from "express-validator";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 120 })
    .withMessage("Name cannot exceed 120 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),

  body("price").notEmpty().withMessage("Price is required").isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("discountPrice").optional().isFloat({ min: 0 }).withMessage("Discount price must be a positive number"),

  body("stock").notEmpty().withMessage("Stock is required").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

  body("category").notEmpty().withMessage("Category is required").isMongoId().withMessage("Category must be a valid ID"),
];

export const updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),

  body("name").optional().trim().isLength({ max: 120 }).withMessage("Name cannot exceed 120 characters"),

  body("description").optional().trim().isLength({ max: 2000 }).withMessage("Description cannot exceed 2000 characters"),

  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("discountPrice").optional().isFloat({ min: 0 }).withMessage("Discount price must be a positive number"),

  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

  body("category").optional().isMongoId().withMessage("Category must be a valid ID"),
];

export const productIdValidator = [param("id").isMongoId().withMessage("Invalid product ID")];

export const removeImageValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),
  body("publicId").notEmpty().withMessage("publicId is required"),
];

export const listProductsValidator = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  query("category").optional().isMongoId().withMessage("Category must be a valid ID"),
  query("minPrice").optional().isFloat({ min: 0 }).withMessage("minPrice must be a positive number"),
  query("maxPrice").optional().isFloat({ min: 0 }).withMessage("maxPrice must be a positive number"),
];
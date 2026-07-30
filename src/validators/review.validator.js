import { body, param } from "express-validator";

export const createReviewValidator = [
  body("productId").notEmpty().withMessage("productId is required").isMongoId().withMessage("productId must be a valid ID"),
  body("rating").notEmpty().withMessage("Rating is required").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment").optional().trim().isLength({ max: 1000 }).withMessage("Comment cannot exceed 1000 characters"),
];

export const updateReviewValidator = [
  param("id").isMongoId().withMessage("Invalid review ID"),
  body("rating").optional().isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment").optional().trim().isLength({ max: 1000 }).withMessage("Comment cannot exceed 1000 characters"),
];

export const reviewIdValidator = [param("id").isMongoId().withMessage("Invalid review ID")];

export const productIdParamValidator = [param("productId").isMongoId().withMessage("Invalid product ID")];
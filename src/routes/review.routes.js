import { Router } from "express";
import { getProductReviews, createReview, updateReview, deleteReview } from "../controllers/review.controller.js";
import { createReviewValidator, updateReviewValidator, reviewIdValidator, productIdParamValidator } from "../validators/review.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/product/:productId", productIdParamValidator, validate, getProductReviews);

router.post("/", protect, createReviewValidator, validate, createReview);
router.patch("/:id", protect, updateReviewValidator, validate, updateReview);
router.delete("/:id", protect, reviewIdValidator, validate, deleteReview);

export default router;
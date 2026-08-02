import asyncHandler from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import * as reviewService from "../services/review.service.js";

export const getProductReviews = asyncHandler(async (req, res) => {
  const { reviews, meta } = await reviewService.listProductReviews(req.params.productId, req.query);
  sendResponse(res, 200, { message: "Reviews fetched successfully", data: reviews, meta });
});

export const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(req.user._id, req.body);
  sendResponse(res, 201, { message: "Review submitted successfully", data: review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewService.updateReview(req.params.id, req.body, req.user._id);
  sendResponse(res, 200, { message: "Review updated successfully", data: review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(req.params.id, req.user);
  sendResponse(res, 200, { message: "Review deleted successfully" });
});
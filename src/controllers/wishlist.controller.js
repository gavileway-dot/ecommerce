import asyncHandler from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import * as wishlistService from "../services/wishlist.service.js";

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getOrCreateWishlist(req.user._id);
  sendResponse(res, 200, { message: "Wishlist fetched successfully", data: wishlist });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.addToWishlist(req.user._id, req.body.productId);
  sendResponse(res, 200, { message: "Product added to wishlist", data: wishlist });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.removeFromWishlist(req.user._id, req.params.productId);
  sendResponse(res, 200, { message: "Product removed from wishlist", data: wishlist });
});
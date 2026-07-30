import asyncHandler from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import * as productService from "../services/product.service.js";

export const getProducts = asyncHandler(async (req, res) => {
  const { products, meta } = await productService.listProducts(req.query);
  sendResponse(res, 200, { message: "Products fetched successfully", data: products, meta });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  sendResponse(res, 200, { message: "Product fetched successfully", data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user._id);
  sendResponse(res, 201, { message: "Product created successfully", data: product });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body, req.user);
  sendResponse(res, 200, { message: "Product updated successfully", data: product });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id, req.user);
  sendResponse(res, 200, { message: "Product deleted successfully" });
});


//Controller Function for adding and removing images
export const addProductImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    const error = new Error("No image files provided");
    error.statusCode = 400;
    throw error;
  }

  const product = await productService.addProductImages(req.params.id, req.files, req.user);
  sendResponse(res, 200, { message: "Images uploaded successfully", data: product });
});

export const removeProductImage = asyncHandler(async (req, res) => {
  const product = await productService.removeProductImage(req.params.id, req.body.publicId, req.user);
  sendResponse(res, 200, { message: "Image removed successfully", data: product });
});
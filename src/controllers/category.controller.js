import asyncHandler from "../utils/asyncHandler.js";
import { sendResponse } from "../utils/response.js";
import * as categoryService from "../services/category.service.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.listCategories();
  sendResponse(res, 200, { message: "Categories fetched successfully", data: categories });
});

export const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  sendResponse(res, 200, { message: "Category fetched successfully", data: category });
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  sendResponse(res, 201, { message: "Category created successfully", data: category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  sendResponse(res, 200, { message: "Category updated successfully", data: category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  sendResponse(res, 200, { message: "Category deleted successfully" });
});
import Category from '../models/category.js';

export const listCategories = async () => {
  return await Category.find({});
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

export const updateCategory = async (id, categoryData) => {
  const category = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
};

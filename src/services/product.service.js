import Product from '../models/product.js';
import { uploadMultipleBuffers, deleteImage } from './upload.service.js';

export const listProducts = async (query) => {
  const { page = 1, limit = 10, search, category, sort } = query;
  
  const filter = {};
  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }
  if (category) {
    filter.category = category;
  }

  const sortOption = {};
  if (sort === 'price_asc') sortOption.price = 1;
  else if (sort === 'price_desc') sortOption.price = -1;
  else sortOption.createdAt = -1;

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit))
    .populate('category', 'name')
    .populate('vendor', 'name email');

  const total = await Product.countDocuments(filter);

  return {
    products,
    meta: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (id) => {
  const product = await Product.findById(id)
    .populate('category', 'name')
    .populate('vendor', 'name email');
    
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

export const createProduct = async (productData, vendorId) => {
  productData.vendor = vendorId;
  return await Product.create(productData);
};

export const updateProduct = async (id, productData, user) => {
  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (product.vendor.toString() !== user._id.toString() && user.role !== 'admin') {
    const error = new Error('Not authorized to update this product');
    error.statusCode = 403;
    throw error;
  }

  // Prevent overriding protected fields
  delete productData.vendor;
  delete productData.images;
  delete productData.ratingsAverage;
  delete productData.ratingsCount;

  Object.assign(product, productData);
  await product.save();

  return product;
};

export const deleteProduct = async (id, user) => {
  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (product.vendor.toString() !== user._id.toString() && user.role !== 'admin') {
    const error = new Error('Not authorized to delete this product');
    error.statusCode = 403;
    throw error;
  }

  await Product.findByIdAndDelete(id);
};

export const addProductImages = async (id, files, user) => {
  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (product.vendor.toString() !== user._id.toString() && user.role !== 'admin') {
    const error = new Error('Not authorized to update this product');
    error.statusCode = 403;
    throw error;
  }

  const uploadResults = await uploadMultipleBuffers(files, 'products');
  const newImages = uploadResults.map(result => ({
    url: result.url,
    publicId: result.publicId,
  }));

  product.images.push(...newImages);
  await product.save();
  return product;
};

export const removeProductImage = async (id, publicId, user) => {
  const product = await Product.findById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  if (product.vendor.toString() !== user._id.toString() && user.role !== 'admin') {
    const error = new Error('Not authorized to update this product');
    error.statusCode = 403;
    throw error;
  }

  product.images = product.images.filter((img) => img.publicId !== publicId);
  await product.save();
  await deleteImage(publicId);
  return product;
};

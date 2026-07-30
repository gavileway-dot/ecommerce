import Cart from '../models/cart.js';
import Product from '../models/product.js';
import asyncHandler from '../utils/asyncHandler.js';

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // Create a new cart for the user
    cart = await Cart.create({
      user: userId,
      items: [{ product: productId, quantity: quantity || 1 }],
    });
    return res.status(201).json(cart);
  }

  // Check if product already exists in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    // Product exists, update quantity
    cart.items[itemIndex].quantity += quantity || 1;
  } else {
    // Product doesn't exist in cart, add new item
    cart.items.push({ product: productId, quantity: quantity || 1 });
  }

  await cart.save();
  res.status(200).json(cart);
});

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate('items.product'); 

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.status(200).json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.status(200).json(cart);
});

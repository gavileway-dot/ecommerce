import Cart from '../models/cart.js';
import asyncHandler from '../utils/asyncHandler.js'; // Assuming this utility exists

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  // Use mock user ID if req.user is not set by auth middleware yet
  const userId = req.user ? req.user._id : '64f0b2f9e4b0e5a1b4c9e8d1'; 

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
  const userId = req.user ? req.user._id : '64f0b2f9e4b0e5a1b4c9e8d1';
  // TODO: Populate 'product' when the Product model is fully integrated.
  const cart = await Cart.findOne({ user: userId }); 

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.status(200).json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeItemFromCart = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user._id : '64f0b2f9e4b0e5a1b4c9e8d1';
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

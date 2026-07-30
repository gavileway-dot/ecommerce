import Wishlist from '../models/wishlist.js';

export const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate('products', 'name price images');
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }
  return wishlist;
};

export const addToWishlist = async (userId, productId) => {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [productId] });
  } else {
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
  }
  return await wishlist.populate('products', 'name price images');
};

export const removeFromWishlist = async (userId, productId) => {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    wishlist.products = wishlist.products.filter((id) => id.toString() !== productId.toString());
    await wishlist.save();
  }
  return await wishlist.populate('products', 'name price images');
};

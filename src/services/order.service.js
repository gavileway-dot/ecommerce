import Product from '../models/product.js';

export const calculateOrderTotal = async (items) => {
  let totalAmount = 0;
  
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) throw new Error(`Product ${item.product} not found`);
    totalAmount += product.price * item.quantity;
  }
  
  return totalAmount;
};

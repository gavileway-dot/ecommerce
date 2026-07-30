export const calculateOrderTotal = async (items) => {
  let totalAmount = 0;
  
  for (const item of items) {
    // In a real scenario, you must fetch the current price from the DB to prevent client-side tampering
    // The Product model is not fully integrated yet, so we'll assume a basic mock or trust the price for now,
    // OR we can simulate fetching:
    
    // const product = await Product.findById(item.product);
    // if (!product) throw new Error(`Product ${item.product} not found`);
    // totalAmount += product.price * item.quantity;
    
    totalAmount += item.price * item.quantity;
  }
  
  return totalAmount;
};

export const mockPaymentService = {
  // eslint-disable-next-line no-unused-vars
  processPayment: async (amount, currency = 'USD') => {
    // Simulate a network request to a payment gateway
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate an 80% success rate
        const isSuccess = Math.random() > 0.2;
        if (isSuccess) {
          resolve({
            success: true,
            transactionId: `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            status: 'successful',
          });
        } else {
          resolve({
            success: false,
            transactionId: null,
            status: 'failed',
            error: 'Payment declined by bank',
          });
        }
      }, 1000); // 1-second simulated delay
    });
  },
};

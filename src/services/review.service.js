import Review from '../models/review.js';

export const listProductReviews = async (productId, query) => {
  const { page = 1, limit = 10 } = query;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ product: productId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('user', 'name');

  const total = await Review.countDocuments({ product: productId });

  return {
    reviews,
    meta: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const createReview = async (userId, reviewData) => {
  const { product, rating, comment } = reviewData;

  const existingReview = await Review.findOne({ product, user: userId });
  if (existingReview) {
    const error = new Error('You have already reviewed this product');
    error.statusCode = 400;
    throw error;
  }

  const review = await Review.create({
    product,
    user: userId,
    rating,
    comment,
  });

  return review;
};

export const updateReview = async (id, reviewData, userId) => {
  const review = await Review.findById(id);
  if (!review) {
    const error = new Error('Review not found');
    error.statusCode = 404;
    throw error;
  }

  if (review.user.toString() !== userId.toString()) {
    const error = new Error('Not authorized to update this review');
    error.statusCode = 403;
    throw error;
  }

  review.rating = reviewData.rating || review.rating;
  review.comment = reviewData.comment || review.comment;
  await review.save();

  return review;
};

export const deleteReview = async (id, user) => {
  const review = await Review.findById(id);
  if (!review) {
    const error = new Error('Review not found');
    error.statusCode = 404;
    throw error;
  }

  if (review.user.toString() !== user._id.toString() && user.role !== 'admin') {
    const error = new Error('Not authorized to delete this review');
    error.statusCode = 403;
    throw error;
  }

  await Review.findByIdAndDelete(id);
};

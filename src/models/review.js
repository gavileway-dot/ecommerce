import mongoose from "mongoose";
import Product from "./Product.js";

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.recalculateProductRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: "$product", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);

  const { avgRating = 0, count = 0 } = stats[0] || {};

  await Product.findByIdAndUpdate(productId, {
    ratingsAverage: avgRating,
    ratingsCount: count,
  });
};

reviewSchema.post("save", function () {
  this.constructor.recalculateProductRating(this.product);
});

reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) doc.constructor.recalculateProductRating(doc.product);
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
import { Router } from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";
import { addToWishlistValidator, removeFromWishlistValidator } from "../validators/wishlist.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

router.get("/", getWishlist);
router.post("/items", addToWishlistValidator, validate, addToWishlist);
router.delete("/items/:productId", removeFromWishlistValidator, validate, removeFromWishlist);

export default router;
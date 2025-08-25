import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Prediction from "../models/Prediction.model.js";

// ✅ Add a prediction to favorites
export const addToFavorites = asyncHandler(async (req, res) => {
  const { predictionId } = req.body;

  if (!predictionId) {
    throw new ApiError(400, "Prediction ID is required");
  }

  // Check if prediction exists
  const prediction = await Prediction.findById(predictionId);
  if (!prediction) {
    throw new ApiError(404, "Prediction not found");
  }

  const user = await User.findById(req.myUser._id);

  // Avoid duplicates
  if (user.favorites.includes(predictionId)) {
    throw new ApiError(400, "Prediction already in favorites");
  }

  user.favorites.push(predictionId);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user.favorites, "Added to favorites"));
});

// ✅ Get all favorites
export const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.myUser._id)
    .populate("favorites") // Populate prediction data
    .select("favorites");

  return res
    .status(200)
    .json(new ApiResponse(200, user.favorites, "Fetched favorites successfully"));
});

// ✅ Remove from favorites
export const removeFromFavorites = asyncHandler(async (req, res) => {
  const { predictionId } = req.params;

  if (!predictionId) {
    throw new ApiError(400, "Prediction ID is required");
  }

  const user = await User.findById(req.myUser._id);

  user.favorites = user.favorites.filter(
    (fav) => fav.toString() !== predictionId
  );

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user.favorites, "Removed from favorites"));
});

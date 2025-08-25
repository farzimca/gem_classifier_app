import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import Prediction from "../models/Prediction.model.js";
import mongoose from "mongoose";

// ✅ Add a prediction to favorites
export const addToFavorites = asyncHandler(async (req, res) => {
  const { predictionId } = req.body;
  const userId = req.myUser._id;

  if (!predictionId || !mongoose.Types.ObjectId.isValid(predictionId)) {
    throw new ApiError(400, "A valid Prediction ID is required");
  }

  // Check if the prediction actually exists
  const predictionExists = await Prediction.findById(predictionId);
  if (!predictionExists) {
    throw new ApiError(404, "Prediction not found");
  }

  // Use $addToSet to add the ID to the favorites array.
  // This automatically prevents duplicates, so you don't need to check first.
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: predictionId } },
    { new: true } // Return the updated document
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser.favorites, "Added to favorites"));
});



// ✅ Get all favorite predictions for the logged-in user
export const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.myUser._id)
    .populate({
      path: "favorites",
      model: "Prediction" // Explicitly specify the model to populate from
    })
    .select("favorites");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user.favorites, "Favorites fetched successfully"));
});



// ✅ Remove a prediction from favorites
export const removeFromFavorites = asyncHandler(async (req, res) => {
  const { id: predictionId } = req.params; // Get ID from URL params
  const userId = req.myUser._id;

  if (!predictionId || !mongoose.Types.ObjectId.isValid(predictionId)) {
    throw new ApiError(400, "A valid Prediction ID is required in the URL");
  }

  // Use $pull to remove the item directly in the database in a single operation.
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: predictionId } },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser.favorites, "Removed from favorites"));
});
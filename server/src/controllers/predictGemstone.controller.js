import Prediction from "../models/Prediction.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

// The URL for your new, high-performance FastAPI ML service
const ML_API_URL = "http://localhost:8000/predict";

/**
 * A helper function to delegate the prediction task to the FastAPI ML service.
 * @param {string} imagePath - The local path to the temporary image file.
 * @param {string} mimetype - The mimetype of the image (e.g., 'image/jpeg').
 * @returns {Promise<string>} The predicted gemstone name.
 */
const getPredictionFromMLService = async (imagePath, mimetype) => {
  try {
    const formData = new FormData();
    // The field name "image" must match what the FastAPI endpoint expects.
    formData.append("image", fs.createReadStream(imagePath), {
      contentType: mimetype,
      filename: "gemstone.jpg", // A placeholder filename is needed
    });

    const response = await axios.post(ML_API_URL, formData, {
      headers: formData.getHeaders(),
    });

    if (!response.data || !response.data.gemstoneName) {
        throw new Error("Invalid response from prediction service.");
    }

    return response.data.gemstoneName;
  } catch (error) {
    console.error("❌ Error calling ML service:", error.response?.data || error.message);
    throw new ApiError(502, "The prediction service is currently unavailable or failed."); // 502 Bad Gateway is appropriate here
  }
};


// --- REFACTORED Controller for GUEST Users ---
export const predictAsGuest = asyncHandler(async (req, res) => {
  const localImagePath = req.file?.path;
  if (!localImagePath) {
    throw new ApiError(400, "Image file is required.");
  }

  try {
    // 1. Get prediction instantly from our fast ML microservice
    const predictedClass = await getPredictionFromMLService(localImagePath, req.file.mimetype);

    // 2. Convert original image to Base64 to send back to the user
    const imageBuffer = fs.readFileSync(localImagePath);
    const base64Image = `data:${req.file.mimetype};base64,${imageBuffer.toString('base64')}`;

    // 3. Send the successful response
    return res.status(200).json(
      new ApiResponse(200, { gemstoneName: predictedClass, imageUrl: base64Image }, "Prediction successful")
    );
  } finally {
    // 4. Always clean up the temporary file
    if (fs.existsSync(localImagePath)) {
      fs.unlinkSync(localImagePath);
    }
  }
});


// --- REFACTORED Controller for LOGGED-IN Users ---
export const predictAsUser = asyncHandler(async (req, res) => {
  const localImagePath = req.file?.path;
  if (!localImagePath) {
    throw new ApiError(400, "Image file is required.");
  }

  try {
    // 1. Get prediction instantly from our fast ML microservice
    const predictedClass = await getPredictionFromMLService(localImagePath, req.file.mimetype);

    // 2. Upload the original image to Cloudinary for permanent storage
    const uploadedImage = await uploadOnCloudinary(localImagePath);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "Failed to upload image to Cloudinary.");
    }

    // 3. Save the prediction result to your database
    const prediction = await Prediction.create({
      user: req.myUser._id,
      gemstoneName: predictedClass,
      imageUrl: uploadedImage.url, // Use the permanent Cloudinary URL
      result: predictedClass,
    });

    // 4. Link the new prediction to the user's history
    await User.findByIdAndUpdate(req.myUser._id, {
      $push: { predictions: prediction._id },
    });

    // 5. Send the successful response
    return res.status(201).json(
      new ApiResponse(201, {
          gemstoneName: predictedClass,
          imageUrl: uploadedImage.url,
          predictionId: prediction._id,
        }, "Prediction successful and saved")
    );
  } finally {
    // 6. Always clean up the temporary file
    if (fs.existsSync(localImagePath)) {
      fs.unlinkSync(localImagePath);
    }
  }
});

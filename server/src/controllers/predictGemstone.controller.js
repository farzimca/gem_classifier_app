import Prediction from "../models/Prediction.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

// Helper function to run the Python script and return a Promise
const runPythonScript = (scriptPath, imageUrl) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [scriptPath, imageUrl]);

    let predictionData = "";
    let errorData = "";

    pythonProcess.stdout.on("data", (data) => {
      predictionData += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        // If the script fails, reject the promise with the error
        console.error(`Python Error: ${errorData}`);
        reject(new ApiError(500, "Prediction script failed"));
      } else {
        // If successful, resolve the promise with the result
        resolve(predictionData.trim());
      }
    });
  });
};


// --- Controller for GUEST Users ---
export const predictAsGuest = asyncHandler(async (req, res) => {
  const localImagePath = req.file?.path;
  if (!localImagePath) {
    throw new ApiError(400, "Image file is required");
  }

  try {
    // 1. Run the prediction
    const pythonPath = path.resolve("./ml_model/predict.py");
    const predictedClass = await runPythonScript(pythonPath, localImagePath);

    if (!predictedClass) {
      throw new ApiError(500, "Prediction failed");
    }

    // 2. Convert image to Base64
    const imageBuffer = fs.readFileSync(localImagePath);
    const base64Image = `data:${req.file.mimetype};base64,${imageBuffer.toString('base64')}`;

    // 3. Send the response
    return res.status(200).json(
      new ApiResponse(
        200,
        { gemstoneName: predictedClass, imageUrl: base64Image },
        "Prediction successful"
      )
    );
  } finally {
    // 4. Clean up the temporary file
    if (localImagePath && fs.existsSync(localImagePath)) {
      fs.unlinkSync(localImagePath);
    }
  }
});


// --- Controller for LOGGED-IN Users ---

export const predictAsUser = asyncHandler(async (req, res) => {
  const localImagePath = req.file?.path;
  if (!localImagePath) {
    throw new ApiError(400, "Image file is required");
  }

  try {
    // ✅ Step 1: Run the prediction on the local file FIRST
    const pythonPath = path.resolve("./ml_model/predict.py");
    const predictedClass = await runPythonScript(pythonPath, localImagePath);

    if (!predictedClass) {
      throw new ApiError(500, "Prediction failed");
    }

    // ✅ Step 2: NOW upload the image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(localImagePath);
    if (!uploadedImage?.url) {
      throw new ApiError(500, "Failed to upload image");
    }

    // ✅ Step 3: Save prediction to DB with the Cloudinary URL
    const prediction = await Prediction.create({
      user: req.myUser._id,
      gemstoneName: predictedClass,
      imageUrl: uploadedImage.url, // Use the URL from Cloudinary
      result: predictedClass,
    });

    // ✅ Step 4: Update user's history
    await User.findByIdAndUpdate(req.myUser._id, {
      $push: { predictions: prediction._id },
    });

    // ✅ Step 5: Send the response
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          gemstoneName: predictedClass,
          imageUrl: uploadedImage.url,
          predictionId: prediction._id,
        },
        "Prediction successful and saved"
      )
    );
  } finally {
    // ✅ Step 6: Clean up the temporary file (this runs last)
    if (localImagePath && fs.existsSync(localImagePath)) {
      fs.unlinkSync(localImagePath);
    }
  }
});
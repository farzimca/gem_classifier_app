import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Optional for guest users
    },
    gemstoneName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // Path or URL to uploaded/captured image
    },
    result: {
      type: String,
      required: true, // Predicted gemstone class
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;

import { Router } from "express";
import { 
  predictAsGuest,
  predictAsUser,
  getMultiplePredictions
} from "../controllers/predictGemstone.controller.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// --- Route for Guest Users ---
router.route("/guest/predict").post(
  upload.single("image"), 
  predictAsGuest
);


// --- Route for Logged-in Users ---
// verifyJWT middleware is required. Only authenticated users can access this.
router.route("/user/predict").post(
  VerifyJWT, 
  upload.single("image"), 
  predictAsUser
);
// --- Route for Upload History ---
router.route("/get-multiple").post(VerifyJWT, getMultiplePredictions);

export default router;
import { Router } from "express";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../controllers/favController.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// This line applies the verifyJWT middleware to ALL routes in this file.
// This is a clean way to protect all favorite-related endpoints.
router.use(VerifyJWT);

// Define routes for getting the list of favorites and adding a new one.
router.route("/")
  .get(getFavorites)
  .post(addToFavorites);

// Define the route for removing a favorite by its ID.
router.route("/:id").delete(removeFromFavorites);

export default router;
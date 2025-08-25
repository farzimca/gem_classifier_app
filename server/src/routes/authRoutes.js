import express from "express";
import { register, login, logout, RefreshAccessToken, PasswordChange, AvatarUpdate, getCurrentUser} from "../controllers/authController.js";
import { upload } from "../middlewares/multer.middleware.js";
import { VerifyJWT } from "../middlewares/auth.middleware.js";


const router = express.Router();

// Register with avatar upload
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/logout", VerifyJWT, logout)
router.post('/refresh-token', RefreshAccessToken)
router.post('/change-password', VerifyJWT, PasswordChange)
router.post('/change-avatar', VerifyJWT, upload.single('avatar'), AvatarUpdate)
router.get("/current-user", VerifyJWT, getCurrentUser);


export default router;

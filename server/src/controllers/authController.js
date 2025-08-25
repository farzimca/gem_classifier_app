import User from "../models/user.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/Cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// REGISTER USER
export const register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  // 1. Validate required fields
  if ([name, username, email, password].some(field => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // 3. Get avatar file
  const avatarFile = req.file?.path;
  if (!avatarFile) {
    throw new ApiError(400, "Avatar file is required");
  }

  // 4. Upload avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarFile);
  if (!avatar?.url) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  // 5. Create user
  const newUser = await User.create({
    name,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
  });

  // 6. Fetch created user excluding password & refresh token
  const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
  if (!createdUser) {
    // Rollback: delete uploaded avatar if user creation fails
    await deleteOnCloudinary(avatar.public_id);
    throw new ApiError(500, "Error while registering user");
  }

  // 7. Generate JWT tokens
  // const accessToken = newUser.generateAccessToken();
  // const refreshToken = newUser.generateRefreshToken();

  // 8. Send response
  return res
    .status(201)
    .json(new ApiResponse(201, {
      user: createdUser,
    }, "User registered successfully"));
});


// LOGIN USER
export const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Validate input
  if (!username && !email) {
    throw new ApiError(400, "Username or Email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  // 2. Find user by username or email
  const userRecord = await User.findOne({ $or: [{ username }, { email }] });
  if (!userRecord) {
    throw new ApiError(404, "User not found");
  }

  // 3. Validate password
  const isValidPassword = await userRecord.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 4. Generate JWT tokens
  const accessToken = userRecord.generateAccessToken();
  const refreshToken = userRecord.generateRefreshToken();

  // 5. Save refreshToken to DB
  userRecord.refreshToken = refreshToken;
  await userRecord.save({ validateBeforeSave: false });

  // 6. Prepare logged-in user info without sensitive fields
  const loggedUser = await User.findById(userRecord._id).select("-password -refreshToken");

  // 7. Set tokens as HTTP-only cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});


export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.myUser._id,
    {
      $unset: { refreshToken: "" },
    },
    { new: true }
  ); // this is not updating

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});


export const RefreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const myUser = await User.findById(decodeToken._id);

    if (!myUser) {
      throw new ApiError(401, "Invalid User");
    }

    if (incomingRefreshToken !== myUser?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const accessToken = await myUser.generateAccessToken();
    const newrefreshToken = await myUser.generateRefreshToken();

    myUser.refreshToken = newrefreshToken;
    await myUser.save({ validateBeforeSave: false });

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "AccessToken Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Invalid or Expired Refresh Token");
  }
});


export const PasswordChange = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    throw new ApiError(400, "Old password and new password can't be the same");
  }

  const myUser = await User.findById(req.myUser._id);
  const isPasswordCorrect = await myUser.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Password");
  }

  myUser.password = newPassword;
  await myUser.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password Changed Successfully"));
});


export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.myUser, "Current User"));
});

export const AvatarUpdate = asyncHandler(async (req, res) => {
  const avatarFile = req.file?.path;

  if (!avatarFile) {
    throw new ApiError(400, "Avatar File is required");
  }

  const currentUser = await User.findById(req.myUser._id); // will get old avatar id of user

  if (!currentUser.avatar) {
    throw new ApiError(400, "No previous avatar found to replace");
  }

  const avatar = await uploadOnCloudinary(avatarFile); // this is full object

  if (!avatar) {
    throw new ApiError(400, "Avatar File Upload Error");
  }

  const myUser = await User
    .findByIdAndUpdate(
      req.myUser._id,
      {
        $set: {
          avatar: avatar.url,
        },
      },
      { new: true }
    )
    .select("-password");
// also handle orphaned file if possible



  // this will delete the old avatar image from Cloudinary
  try {
    await deleteOnCloudinary(currentUser.avatar);
  } catch (err) {
    console.error("Failed to delete old avatar:", err.message || err);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, myUser, `Avatar Updated Successfully`));
});

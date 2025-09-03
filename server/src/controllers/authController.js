import User from "../models/user.model.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/Cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { sendEmail } from '../utils/sendMail.js';
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
  const avatarFile = req.file?.buffer;
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

  //Node Mail

  // In your user.controller.js (or wherever you handle registration)

const welcomeSubject = `Welcome to GEMX! 🎉`;

// The plain-text version for email clients that don't support HTML
const welcomeText = `
Hi ${createdUser.name},

Welcome to GEMX! We're thrilled to have you join our community.

You're now ready to explore the fascinating world of gemstones with the power of AI. To get started, simply visit our prediction page and upload an image.

Start Predicting: https://gemx-frontend-eta.vercel.app/predict  // Replace with your actual frontend URL

Happy exploring!

The GEMX Team
`;


// The beautiful HTML version
const welcomeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to GEMX</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin: 20px auto; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <!-- Header with Gradient -->
        <tr>
            <td align="center" style="padding: 40px 0; background: linear-gradient(to right, #8B5CF6, #EC4899); color: #ffffff;">
                <h1 style="margin: 0; font-size: 36px; font-weight: bold;">Welcome to GEMX</h1>
            </td>
        </tr>
        <!-- Main Content -->
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="font-size: 24px; margin: 0 0 20px 0; color: #333333;">Hi ${createdUser.name},</h2>
                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #555555;">
                    <b>You have registered successfully!</b> We are thrilled to have you join the GEMX community.
                </p>
                <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #555555;">
                    Upload an image of any gemstone to get started and uncover its secrets.
                </p>
                <!-- Call-to-Action Button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <a href="https://gemx-frontend-eta.vercel.app/predict" target="_blank" style="display: inline-block; padding: 15px 30px; font-size: 18px; font-weight: bold; color: #ffffff; background-color: #8B5CF6; text-decoration: none; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                                Start Predicting Now
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #eeeeee;">
                <p style="margin: 0; font-size: 12px; color: #999999;">
                    You received this email because you signed up for an account on GEMX.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #999999;">
                    &copy; ${new Date().getFullYear()} GEMX. All Rights Reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;


// --- How to use it ---
try {
    await sendEmail({
      to: createdUser.email,
      subject: welcomeSubject,
      text: welcomeText,
      html: welcomeHtml
    });
} catch (emailError) {
    console.error(`Failed to send welcome email to ${createdUser.email}`, emailError);
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

    if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Both old and new passwords are required");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(400, "Old password and new password can't be the same");
  }

  const myUser = await User.findById(req.myUser._id);
  const isPasswordCorrect = await myUser.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Password");
  }


  if (!newPassword.trim() || newPassword.trim().length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  myUser.password = newPassword;
  await myUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password Changed Successfully"));
});


export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.myUser, "Current User"));
});

export const AvatarUpdate = asyncHandler(async (req, res) => {
  const avatarFile = req.file?.buffer;

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


export const UpdateUser = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  const updateData = {}; // This will hold the valid fields to update

  // 1. Validate and add fullname if it's a non-empty string
  if (fullname && fullname.trim() !== "") {
    // We use trim() to remove leading/trailing whitespace and then check for emptiness
    updateData.name = fullname.trim();
  }

  // 2. Validate and add email if it's a non-empty string
  if (email && email.trim() !== "") {
    const trimmedEmail = email.trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new ApiError(400, "Invalid email format.");
    }

    // Check if the trimmed email is already in use by another user
    const existingUser = await User.findOne({
      email: trimmedEmail,
      _id: { $ne: req.myUser._id },
    });
    if (existingUser) {
      throw new ApiError(409, "This email is already taken by another account.");
    }

    updateData.email = trimmedEmail;
  }

  // 3. Check if there's actually anything valid to update
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No valid fields provided for update. Empty or whitespace-only values are not allowed.");
  }

  // 4. Perform the update with the validated and cleaned data
  const updatedUser = await User.findByIdAndUpdate(
    req.myUser._id,
    {
      $set: updateData, // Only valid, non-empty fields will be in here
    },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not found.");
  }

  // 5. Send the successful response
  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User details updated successfully."));
});



export const requestPasswordReset = asyncHandler(async (req, res) =>{

 const { email } = req.body; 

  if (!email) {
    throw new ApiError(400, "Email is required.");
  }
  
  const user = await User.findOne({ email })
  
  if(!user)
  {
    throw new ApiError(400, `It looks like ${email} isn't connected to an account. You can create a new account with this email or try again`);
  }


   // Create a reset token (expires in 15 minutes)
  const resetToken = jwt.sign(
    { _id: user._id, purpose: "resetPassword" },
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: "15m" }
  );


    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`; // change with frontend Link Later


     // Email content
  const subject = "Your GEMX Password Reset Request";

// The plain-text version for email clients that don't support HTML
const text = `
Hi ${user.name},

We received a request to reset the password for your GEMX account.

Please click the link below to set a new password. This link is only valid for the next 15 minutes.

Reset your password: ${resetURL}

If you did not request a password reset, you can safely ignore this email. Your password will not be changed.

Thank you,
The GEMX Team
`;

// The beautiful, themed HTML version
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin: 20px auto; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <!-- Header with GEMX Gradient -->
        <tr>
            <td align="center" style="padding: 40px 0; background: linear-gradient(to right, #8B5CF6, #EC4899); color: #ffffff;">
                <h1 style="margin: 0; font-size: 36px; font-weight: bold;">GEMX</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px;">Password Reset</p>
            </td>
        </tr>
        <!-- Main Content -->
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="font-size: 24px; margin: 0 0 20px 0; color: #333333;">Hi ${user.name},</h2>
                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5; color: #555555;">
                    We received a request to reset the password associated with your account.
                </p>
                <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #555555;">
                    Please click the button below to set a new password. For your security, this link will expire in <strong>15 minutes</strong>.
                </p>
                <!-- Call-to-Action Button -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <a href="${resetURL}" target="_blank" style="display: inline-block; padding: 15px 30px; font-size: 18px; font-weight: bold; color: #ffffff; background-color: #8B5CF6; text-decoration: none; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                                Reset Your Password
                            </a>
                        </td>
                    </tr>
                </table>
                <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.5; color: #777777; text-align: center;">
                    If you did not request a password reset, please disregard this email. Your account is secure.
                </p>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 20px 30px; background-color: #f9fafb; border-top: 1px solid #eeeeee;">
                <p style="margin: 0; font-size: 12px; color: #999999;">
                    &copy; ${new Date().getFullYear()} GEMX. All Rights Reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`;


  try {
    await sendEmail({ to: email, subject, text, html });
  } catch (err) {
    console.error("Error sending reset password email:", err);
  }

  return res.status(200).json(new ApiResponse(200, {}, "A reset link has been sent"));

});


export const resetPassword = asyncHandler(async (req, res) => {


//  const token = req.params;;


  const { token, newPassword, confirmPassword } = req.body;



  if (!token || !newPassword || !confirmPassword) {
    throw new ApiError(400, "Token and passwords are required");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  // Verify reset token
  let payload;
  try {
    payload = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
  } catch (err) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  if (payload.purpose !== "resetPassword") {
    throw new ApiError(400, "Invalid reset token");
  }

  // Find user
  const user = await User.findById(payload._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }


  user.password = newPassword;

  // Save updated user
  await user.save();

  // Optionally, invalidate all existing refresh tokens or sessions here

  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully"));
});

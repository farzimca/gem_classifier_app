import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPasswordForm = () => {
const [formData, setFormData] = useState({
email: '',
newPassword: '',
confirmNewPassword: '',
});
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        // Update the specific field based on its name
        ...(name === "email" && { email: value }),
        ...(name === "newPassword" && { newPassword: value }),
        ...(name === "confirmNewPassword" && { confirmNewPassword: value }),
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset Password Form Submitted:", formData);
    // Add your reset password logic here
};

const togglePasswordVisibility = (field) => {
    if (field === 'newPassword') {
        setShowNewPassword(!showNewPassword);
    } else if (field === 'confirmNewPassword') {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    }
};

return (
    <div className="flex flex-col min-h-screen bg-gray-200 p-8 w-full max-w-lg">
        <div className="bg-white p-8 rounded-2xl border-2 border-black shadow-md w-full max-w-md">
            <h1 className="text-3xl font-bold text-center">RESET PASSWORD</h1>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Email Address */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaEnvelope />
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* New Password */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaLock />
                    </span>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="w-full pl-10 pr-10 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={() => togglePasswordVisibility('newPassword')}
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaLock />
                    </span>
                    <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        className="w-full pl-10 pr-10 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={() => togglePasswordVisibility('confirmNewPassword')}
                    >
                        {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Reset Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-yellow-300 text-black font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    RESET
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Do not have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
        </div>
    </div>
);

};

export default ResetPasswordForm;
import React, { useState } from "react";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'; // Example icons
import LoginPage from "../pages/LoginPage";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        // ... (state remains the same)
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });

    const handleChange = (e) => {
        // ... (logic remains the same)
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            avatar: file,
        }));
    }


    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        // This container holds only the form itself
        <div className="bg-white p-8 rounded-2xl border-2 border-black w-full max-w-lg">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <h2 className="text-xl text-center text-gray-600 mt-2">Welcome to GEMX</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Full Name */}
                <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="fullname"
                    className="w-full px-4 py-2 border-2 border-black rounded-md"
                />

                {/* Username */}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    className="w-full px-4 py-2 border-2 border-black rounded-md"
                />

                {/* Email Address with Icon */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaEnvelope className="text-gray-400" />
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-md"
                    />
                </div>

                {/* Upload Avatar */}
                <label className="w-full flex items-center justify-center cursor-pointer border-2 border-black rounded-md px-4 py-2 hover:bg-gray-50">
                    {formData.avatar ? formData.avatar.name : "Upload Avatar"}
                    <input
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {/* Password with Icon */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaLock className="text-gray-400" />
                    </span>
                    <input
                        type={showPassword.password ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border-2 border-black rounded-md"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility('password')}
                    >
                        {showPassword.password ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
                    </span>
                </div>

                {/* Confirm Password with Icon and Eye */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FaLock className="text-gray-400" />
                    </span>
                    <input
                        type={showPassword.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-10 py-2 border-2 border-black rounded-md"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                    >
                        {showPassword.confirmPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
                    </span>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Register
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">
                    Log In
                </a>
            </p>
        </div>
    );
}

export default RegisterForm;
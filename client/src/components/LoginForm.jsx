import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
const [formData, setFormData] = useState({
email: '',
password: '',
});
const [showPassword, setShowPassword] = useState(false);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        // Removed unnecessary conditional logic
        // Checking for name specifically avoids issues
        // with potentially similar named elements
        // in the form
        ...(name === "email" && { email: value }),
        ...(name === "password" && { password: value })
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Form Submitted:", formData);
    // Add your login logic here
};

const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

return (
    <div className="flex flex-col min-h-screen bg-gray-200 p-8 w-full max-w-lg">
        <div className="bg-white p-8 rounded-2xl border-2 border-black shadow-md w-full max-w-xl">
            <h1 className="text-3xl font-bold text-center">GEMX</h1>
            <h2 className="text-xl text-center text-gray-600 mt-2">Log in with</h2>

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

                {/* Password */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaLock />
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full pl-10 pr-10 py-2 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className="text-right text-sm text-gray-600">
                    <a href="/reset-password" className="hover:underline">Forgot Password?</a>
                </div>

                {/* Log In Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-yellow-300 text-black font-semibold rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    Log In
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Do not have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
            </p>
        </div>
    </div>
);

};

export default LoginForm
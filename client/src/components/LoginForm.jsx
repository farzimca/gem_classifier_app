import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../store/auth";

const LoginForm = () => {
    const navigate = useNavigate();
    // Get the new loginUser function from useAuth
    const { loginUser } = useAuth();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // ... rest of your state and icon components

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Call the centralized loginUser function
        const result = await loginUser(formData);
        
        setLoading(false);

        if (result.success) {
            setSuccess(result.message);
            navigate('/user/predict');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
            <h2 className="text-lg text-center text-gray-500 mt-2">Log in to continue</h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {/* Email Input */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <EnvelopeIcon className="text-gray-400" />
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Password Input */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LockIcon className="text-gray-400" />
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeSlashIcon className="text-gray-600" /> : <EyeIcon className="text-gray-600" />}
                    </span>
                </div>
                
                {/* Forgot Password Link - Added here */}
                <div className="text-right -mt-2">
                    <a href="/reset-password" className="text-sm font-medium text-purple-600 hover:underline">
                        Forgot your password?
                    </a>
                </div>

                {/* Display Error/Success Messages */}
                {error && <p className="text-center text-sm text-red-600">{error}</p>}
                {success && <p className="text-center text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-purple-300"
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-purple-600 hover:underline">
                    Register
                </a>
            </p>
        </div>
    );
};

export default LoginForm;
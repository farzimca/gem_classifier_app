import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 

// --- SVG Icons ---
// Using inline SVGs for consistency and to avoid external dependencies.

const EnvelopeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.33L4 8.7V6.29l8 5.33 8-5.33V8.7z" />
  </svg>
);

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.email) {
            setError("Please enter your email address.");
            return;
        }

        // Backend API call to send the reset link
        try {
            const response = await fetch('/api/v1/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message || "A password reset link has been sent to your email.");
                // You may want to navigate the user after a successful request
                // For example: navigate('/login');
            } else {
                setError(data.message || "Failed to send reset link. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Forgot Password?</h1>
            <h2 className="text-lg text-center text-gray-500 mt-2">Enter your email to receive a reset link.</h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {/* Email Address */}
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
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                    />
                </div>

                {/* Error and Success Messages */}
                {error && <p className="text-center text-sm text-red-600">{error}</p>}
                {success && <p className="text-center text-sm text-green-600">{success}</p>}

                {/* Reset Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    SEND RESET LINK
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Remember your password?{' '}
                <a href="/login" className="font-medium text-purple-600 hover:underline">
                    Log in
                </a>
            </p>
        </div>
    );
};

export default ResetPasswordForm;
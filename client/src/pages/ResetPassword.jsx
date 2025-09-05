import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// SVG Icons (These remain unchanged)
const LockIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M12 17a2 2 0 002-2h-4a2 2 0 002 2zm6-9h-1V6a5 5 0 00-10 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zM9 6a3 3 0 016 0v2H9V6z" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 13C9.24 17.5 7 15.26 7 12.5S9.24 7.5 12 7.5s5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

const EyeSlashIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.74C21.27 7.61 17 4.5 12 4.5c-1.77 0-3.39.53-4.74 1.44l2.92 2.92c.56-.23 1.17-.36 1.82-.36zm-4.6 11.14L6.26 17c-1.51-1.26-2.7-2.89-3.44-4.74C4.73 7.61 9 4.5 14 4.5c.2 0 .4.01.6.03l-1.58 1.58c-.56.23-1.17.36-1.82.36-2.76 0-5 2.24-5 5 0 .65.13 1.26.36 1.82L2.39 2.39 1.11 3.67l20.22 20.22 1.28-1.28-4.6-4.6z" />
  </svg>
);


const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'newPassword') {
            setShowNewPassword(prev => !prev);
        } else if (field === 'confirmNewPassword') {
            setShowConfirmNewPassword(prev => !prev);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation checks
    if (!token) {
        setError("Invalid or missing token.");
        setLoading(false);
        return;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
        setError("New passwords do not match.");
        setLoading(false);
        return;
    }
    if (formData.newPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        setLoading(false);
        return;
    }

    try {
        const response = await fetch('/api/v1/users/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // CORRECT FIX: Include confirmPassword in the body
            body: JSON.stringify({ 
                token, 
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmNewPassword // This line is the key fix
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccess(data.message || "Password has been updated successfully!");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setError(data.message || "Failed to update password. Please try again.");
        }
    } catch (err) {
        setError("An unexpected error occurred. Please try again later.");
    } finally {
        setLoading(false);
    }
};

    return (
       <div className="flex items-center justify-center min-h-screen w-full bg-gray-200 p-4 sm:p-8">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-gray-200 w-full max-w-sm sm:max-w-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Reset Password</h1>
            <h2 className="text-sm sm:text-lg text-center text-gray-500 mt-2">Enter your new password below.</h2>

            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4">
                {/* New Password */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LockIcon className="text-gray-400" />
                    </span>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New Password"
                        className="w-full pl-10 pr-10 py-2 sm:py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility('newPassword')}
                    >
                        {showNewPassword ? <EyeSlashIcon className="text-gray-600" /> : <EyeIcon className="text-gray-600" />}
                    </span>
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LockIcon className="text-gray-400" />
                    </span>
                    <input
                        type={showConfirmNewPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        placeholder="Confirm New Password"
                        className="w-full pl-10 pr-10 py-2 sm:py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility('confirmNewPassword')}
                    >
                        {showConfirmNewPassword ? <EyeSlashIcon className="text-gray-600" /> : <EyeIcon className="text-gray-600" />}
                    </span>
                </div>

                {/* Error and Success Messages */}
                {error && <p className="text-center text-sm text-red-600">{error}</p>}
                {success && <p className="text-center text-sm text-green-600">{success}</p>}

                {/* Reset Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-purple-600 cursor-pointer text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {loading ? 'Updating...' : 'RESET PASSWORD'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                <a href="/login" className="font-medium text-purple-600 hover:underline">
                    Back to Log In
                </a>
            </p>
        </div>
       </div>
    );
};

export default ResetPassword;
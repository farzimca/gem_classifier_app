import React, { useState } from "react";

// --- SVG Icons ---
// Using inline SVGs to avoid external dependencies and potential build errors.

const LockIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
        <path d="M12 17a2 2 0 002-2h-4a2 2 0 002 2zm6-9h-1V6a5 5 0 00-10 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zM9 6a3 3 0 016 0v2H9V6z" />
    </svg>
);

const EnvelopeIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.33L4 8.7V6.29l8 5.33 8-5.33V8.7z" />
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

const UserIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const IdCardIcon = ({ className }) => (
     <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
        <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM6 8h8v2H6V8zm12 8H6v-2h12v2zm-4-4H6v-2h8v2z" />
    </svg>
);


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '', // Changed from 'fullname' to match backend
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: null,
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    
    // State for handling loading, success, and error feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Frontend validation for password confirmation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        if (!formData.avatar) {
            setError("Please upload an avatar image.");
            return;
        }

        setLoading(true);

        // Use FormData to send both text fields and the file
        const data = new FormData();
        data.append('name', formData.name);
        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('avatar', formData.avatar);

        try {
            // API call to your backend endpoint
            const response = await fetch('http://localhost:4000/api/v1/users/register', {
                method: 'POST',
                body: data,
            });
            
            const responseText = await response.text();

            if (!response.ok) {
                // Handle server-side errors
                try {
                    const errorJson = JSON.parse(responseText);
                    throw new Error(errorJson.message || 'An error occurred during registration.');
                } catch (parseError) {
                    throw new Error(responseText || 'An unknown server error occurred.');
                }
            }
            
            // Handle successful registration
            if (responseText) {
                const result = JSON.parse(responseText);
                setSuccess(result.message || 'Registration successful! Please log in.');
                console.log(result);
            } else {
                setSuccess('Registration successful! Please log in.');
            }

            // Clear the form after successful submission
            setFormData({
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                avatar: null,
            });

        } catch (err) {
            // Handle network errors (like CORS or server being down)
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Create Account</h1>
            <h2 className="text-lg text-center text-gray-500 mt-2">Join the community!</h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {/* Full Name Input */}
                <div className="relative">
                     <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <IdCardIcon className="text-gray-400" />
                    </span>
                    <input
                        type="text"
                        name="name" // Matches the backend field
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Username Input */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <UserIcon className="text-gray-400" />
                    </span>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

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

                {/* Avatar File Input */}
                <label className="w-full flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-md px-4 py-3 text-gray-500 hover:bg-gray-50 hover:border-purple-500">
                    {formData.avatar ? formData.avatar.name : "Upload Avatar"}
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {/* Password Input */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LockIcon className="text-gray-400" />
                    </span>
                    <input
                        type={showPassword.password ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility('password')}
                    >
                        {showPassword.password ? <EyeSlashIcon className="text-gray-600" /> : <EyeIcon className="text-gray-600" />}
                    </span>
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <LockIcon className="text-gray-400" />
                    </span>
                    <input
                        type={showPassword.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        required
                        className="w-full pl-10 pr-10 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                    >
                        {showPassword.confirmPassword ? <EyeSlashIcon className="text-gray-600" /> : <EyeIcon className="text-gray-600" />}
                    </span>
                </div>
                
                {/* Display Error/Success Messages */}
                {error && <p className="text-center text-sm text-red-600">{error}</p>}
                {success && <p className="text-center text-sm text-green-600">{success}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-purple-300"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-purple-600 hover:underline">
                    Log In
                </a>
            </p>
        </div>
    );
}

export default RegisterForm;

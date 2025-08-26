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

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    
    // State for handling loading, success, and error feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // API call to your backend login endpoint
            const response = await fetch('http://localhost:4000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const responseText = await response.text();

            if (!response.ok) {
                // Handle server-side errors
                try {
                    const errorJson = JSON.parse(responseText);
                    throw new Error(errorJson.message || 'An error occurred during login.');
                } catch (parseError) {
                    throw new Error(responseText || 'An unknown server error occurred.');
                }
            }

            // Handle successful login
            const result = JSON.parse(responseText);
            setSuccess(result.message || 'Login successful!');
            console.log("Login successful:", result);
            // Here you would typically save the token and redirect the user
            // e.g., localStorage.setItem('token', result.data.accessToken);
            // window.location.href = '/dashboard';

        } catch (err) {
            // Handle network errors
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
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

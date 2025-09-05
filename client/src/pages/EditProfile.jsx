import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'sonner';
// Import the eye icons from react-icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const EditProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // State for toggling password visibility
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Destructure the user, token, and the crucial fetchUserData function
    const { user, token, fetchUserData } = useAuth();

    const [formData, setFormData] = useState({
        fullname: '',
        oldPassword: '',
        password: '',
        avatar: null,
    });

    const [loading, setLoading] = useState(false);

    // Use useEffect to populate the form with user data on component load
    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user.name || '',
                oldPassword: '',
                password: '',
                avatar: user.avatar || '',
            });
        }
    }, [user]);

    // Function to handle changes to the file input
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Create a local URL for image preview
            const imageUrl = URL.createObjectURL(file);
            setFormData(prevState => ({ ...prevState, avatar: imageUrl }));
        } else {
            toast.error("Please select a valid image file for your avatar.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- 🧑‍💻 ADDED VALIDATION LOGIC ---
        // Check if a new password is being entered and if it's too short.
        if (formData.password && formData.password.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return; // Stop the submission process if validation fails
        }
        
        setLoading(true);

        // Track what was successfully updated to provide a more specific success message
        const updatedFields = [];

        try {
            // --- Update basic user info (fullname) ---
            if (formData.fullname !== user.name) {
                const userInfoResponse = await fetch('/api/v1/users/current-userinfo', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: formData.fullname,
                    }),
                });

                const userInfoResult = await userInfoResponse.json();
                if (!userInfoResponse.ok) {
                    throw new Error(userInfoResult.message || 'Failed to update full name.');
                }
                updatedFields.push('fullname');
            }

            // --- Conditionally update password if old and new passwords are provided ---
            if (formData.oldPassword && formData.password) {
                const passwordResponse = await fetch('/api/v1/users/change-password', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        oldPassword: formData.oldPassword,
                        newPassword: formData.password,
                    }),
                });

                const passwordResult = await passwordResponse.json();
                if (!passwordResponse.ok) {
                    throw new Error(passwordResult.message || 'Failed to update password.');
                }
                updatedFields.push('password');
            }

            // --- Conditionally upload the new avatar if a file was selected ---
            if (fileInputRef.current && fileInputRef.current.files[0]) {
                const formDataForAvatar = new FormData();
                formDataForAvatar.append('avatar', fileInputRef.current.files[0]);

                const avatarResponse = await fetch('/api/v1/users/change-avatar', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formDataForAvatar,
                });

                const avatarResult = await avatarResponse.json();
                if (!avatarResponse.ok) {
                    throw new Error(avatarResult.message || 'Failed to update avatar.');
                }
                updatedFields.push('avatar');
            }

            // Final Step: Re-fetch user data to refresh state after all updates are complete
            await fetchUserData();

            // Display a single, comprehensive success message based on what was updated
            if (updatedFields.length > 0) {
                const message = `Successfully updated: ${updatedFields.join(', ')}.`;
                toast.success(message);
            } else {
                toast.info("No changes detected. Profile was not updated.");
            }

            // Navigate to the profile page
            navigate('/profile');

        } catch (err) {
            toast.error(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // Display a loading message if user data is not yet available
    if (!user) {
        return <div className="text-center mt-20">Loading profile data...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
            <main className="flex-grow container mx-auto p-4 sm:p-8 mt-8 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">Update Profile</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        {/* Profile Picture */}
                        <div className="relative w-40 h-40 rounded-full bg-pink-200 flex items-center justify-center overflow-hidden mb-6 shadow-md border-2 border-purple-100">
                            <img
                                src={formData.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZWf0l9giN9QZsq3KEs_fZMTy2EiiukBzXg&s'}
                                alt="Profile Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Upload New Avatar Button */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm hover:bg-gray-200 transition-colors border border-gray-200 mb-6"
                        >
                            Upload new avatar
                        </button>

                        {/* Change Full Name */}
                        <p className="text-sm font-medium text-gray-600 w-full max-w-sm mb-1 text-center">Full Name</p>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={(e) => setFormData(prevState => ({ ...prevState, fullname: e.target.value }))}
                            placeholder="Full Name"
                            className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 mb-4"
                        />

                        {/* Old Password */}
                        <p className="text-sm font-medium text-gray-600 w-full max-w-sm mb-1 text-center">Old Password</p>
                        <div className="relative w-full max-w-sm">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={(e) => setFormData(prevState => ({ ...prevState, oldPassword: e.target.value }))}
                                placeholder="Old Password"
                                className="w-full bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showOldPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                            </button>
                        </div>
                        
                        {/* New Password */}
                        <p className="text-sm font-medium text-gray-600 w-full max-w-sm mt-4 mb-1 text-center">New Password</p>
                        <div className="relative w-full max-w-sm">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
                                placeholder="New Password"
                                className="w-full bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                {showNewPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                            </button>
                        </div>

                        <div className="mb-4" /> {/* Spacer div for consistent spacing */}

                        {/* Update Profile Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full max-w-sm cursor-pointer bg-yellow-400 text-gray-800 font-bold px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-colors transform hover:scale-105 disabled:opacity-50"
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditProfile;
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Destructure the user, token, and the crucial fetchUserData function
  const { user, token, fetchUserData } = useAuth();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    avatar: null, // Initialize avatar state to null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Use useEffect to populate the form with user data on component load
  useEffect(() => {
    if (user) {
      setFormData({
        // FIX 1: Change user.name to user.fullname for consistency
        fullname: user.name || '',
        email: user.email || '',
        // Do NOT populate the password field for security
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
      alert("Please select a valid image file for your avatar.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let isUpdateSuccessful = true;

      // Update basic user info (fullname and email)
      const userInfoResponse = await fetch('/api/v1/users/current-userinfo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // FIX 2: Change formData.name to formData.fullname
          fullname: formData.fullname,
          email: formData.email,
        }),
      });

      const userInfoResult = await userInfoResponse.json();
      if (!userInfoResponse.ok) {
        throw new Error(userInfoResult.message || 'Failed to update user info.');
      }
      setSuccess("Profile updated successfully!");

      // Conditionally update password if a value is provided
      if (formData.password) {
        const passwordResponse = await fetch('/api/v1/users/change-password', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: formData.password,
          }),
        });

        const passwordResult = await passwordResponse.json();
        if (!passwordResponse.ok) {
          throw new Error(passwordResult.message || 'Failed to update password.');
        }

        setSuccess("Profile and password updated successfully!");
      }

      // Conditionally upload the new avatar if a file was selected
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

        setSuccess("Profile, password, and avatar updated successfully!");
      }

      // Final Step: Re-fetch user data to refresh state after all updates are complete
      await fetchUserData();

      // Navigate to the profile page after a short delay
      setTimeout(() => navigate('/profile'), 1500);

    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
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
                src={formData.avatar || 'https://via.placeholder.com/150'}
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
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={(e) => setFormData(prevState => ({ ...prevState, fullname: e.target.value }))}
              placeholder="Full Name"
              className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 mb-4"
            />

            {/* Change Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
              placeholder="Email"
              className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 mb-4"
            />

            {/* Change Password */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
              placeholder="Change Password"
              className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 mb-8"
            />

            {/* Display status messages */}
            {success && <p className="text-center text-sm text-green-600 mb-4">{success}</p>}
            {error && <p className="text-center text-sm text-red-600 mb-4">{error}</p>}

            {/* Update Profile Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-sm bg-yellow-400 text-gray-800 font-bold px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-colors transform hover:scale-105 disabled:opacity-50"
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
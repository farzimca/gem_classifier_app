import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar'; // Assuming Navbar is imported elsewhere or provided
// import Footer from './Footer'; // Assuming Footer is imported elsewhere or provided

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Placeholder initial data - in a real app, this would come from your user context or an API call
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/150/FFC0CB/FFFFFF?text=JD"); // Placeholder for a pink circle
  const [newAvatarFile, setNewAvatarFile] = useState(null);

  const handleAvatarUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setNewAvatarFile(file);
      // Optionally, show a preview of the new avatar
      setProfilePicture(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file for your avatar.");
      setNewAvatarFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend API
    console.log("Updating profile with:", {
      fullName,
      email,
      newAvatarFile, // This would be sent as a FormData object typically
    });

    // Simulate API call delay
    setTimeout(() => {
      alert("Profile updated successfully!");
      // After successful update, navigate back to the profile page
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">

      <main className="flex-grow container mx-auto p-4 sm:p-8 mt-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">Update Profile</h1>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {/* Profile Picture */}
            <div className="relative w-40 h-40 rounded-full bg-pink-200 flex items-center justify-center overflow-hidden mb-6 shadow-md border-2 border-purple-100">
              <img src={profilePicture} alt="Profile Avatar" className="w-full h-full object-cover" />
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
              onClick={handleAvatarUploadClick}
              className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm hover:bg-gray-200 transition-colors border border-gray-200 mb-6"
            >
              Upload new avatar
            </button>

            {/* Change Full Name */}
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Change Full Name"
              className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 mb-4"
            />

            {/* Change Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Change Email"
              className="w-full max-w-sm bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 mb-8"
            />

            {/* Update Profile Button */}
            <button
              type="submit"
              className="w-full max-w-sm bg-yellow-400 text-gray-800 font-bold px-4 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-colors transform hover:scale-105"
            >
              Update Profile
            </button>
          </form>
        </div>
      </main>

    </div>
  );
};

export default EditProfile;
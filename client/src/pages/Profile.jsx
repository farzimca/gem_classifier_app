import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  // Placeholder data - in a real app, this would come from your user context or an API call
  const userProfile = {
    fullName: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150/FFC0CB/FFFFFF?text=JD", // Placeholder for a pink circle
    favoriteCount: 5, // Example: number of favorited items
    uploadHistory: [
      { id: 1, imageUrl: "https://via.placeholder.com/100/93C5FD/FFFFFF?text=Gem1", alt: "Uploaded Gem 1" },
      { id: 2, imageUrl: "https://via.placeholder.com/100/A78BFA/FFFFFF?text=Gem2", alt: "Uploaded Gem 2" },
      { id: 3, imageUrl: "https://via.placeholder.com/100/FDBA74/FFFFFF?text=Gem3", alt: "Uploaded Gem 3" },
      { id: 4, imageUrl: "https://via.placeholder.com/100/FECDD6/FFFFFF?text=Gem4", alt: "Uploaded Gem 4" },
      { id: 5, imageUrl: "https://via.placeholder.com/100/D1D5DB/FFFFFF?text=Gem5", alt: "Uploaded Gem 5" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      {/* <Navbar /> -- Assuming Navbar is rendered outside this component */}

      <main className="flex-grow container mx-auto p-4 sm:p-8 mt-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <Link to="/edit-profile" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors text-lg">
              Edit
            </Link>
          </div>

          {/* Profile Details */}
          <div className="flex flex-col items-center mb-10">
            {/* Profile Picture */}
            <div className="relative w-40 h-40 rounded-full bg-pink-200 flex items-center justify-center overflow-hidden mb-6 shadow-md border-2 border-purple-100">
              <img src={userProfile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {/* Information Boxes */}
            <div className="w-full max-w-sm space-y-4">
              <div className="bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200">
                {userProfile.fullName}
              </div>
              <div className="bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200">
                {userProfile.username}
              </div>
              <div className="bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200">
                {userProfile.email}
              </div>
              <Link to="/favorites" className="block bg-purple-100 text-purple-700 font-bold px-4 py-3 rounded-lg text-center shadow-sm hover:bg-purple-200 transition-colors border border-purple-200">
                Favorites ({userProfile.favoriteCount})
              </Link>
            </div>
          </div>

          {/* Upload History */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload History</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {userProfile.uploadHistory.map((item) => (
                <div key={item.id} className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center">
                  <img src={item.imageUrl} alt={item.alt} className="w-full h-full object-cover" />
                </div>
              ))}
              {/* Placeholder for more upload history items if less than 5 */}
              {userProfile.uploadHistory.length < 5 && Array.from({ length: 5 - userProfile.uploadHistory.length }).map((_, index) => (
                <div key={`placeholder-${index}`} className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
                  <span className="text-sm">No Image</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Profile;
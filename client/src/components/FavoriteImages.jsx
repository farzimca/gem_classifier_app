import React from 'react';

const FavoriteImages = ({ username = "User" }) => {
// In a real application, you would fetch these images dynamically
const favoriteImages = Array(10).fill(null); // Placeholder for 10 images

return (
<div className="bg-gray-100 min-h-screen p-6">
<div className="container mx-auto">
<h1 className="text-2xl font-semibold text-gray-800 mb-2">HELLO, {username}</h1>
<p className="text-gray-600 mb-6">Your favorite images</p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {favoriteImages.map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 rounded-md shadow-sm aspect-w-1 aspect-h-1 flex items-center justify-center"
        >
          {/* Placeholder for image content */}
          <div className="w-1/3 h-1/3 border border-gray-400 rounded-sm">
          <img src="../assets/gems-hero.png" alt="wrongpath" />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

);
};

export default FavoriteImages
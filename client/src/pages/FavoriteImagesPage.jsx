import React, { useState } from 'react';
import gemHero from '../assets/gems-hero.png'; // Make sure this path is correct
import { FaTrash } from 'react-icons/fa'; // Import the trash can icon

const FavoriteImagesPage = ({ username = "User" }) => {
    // We use state to manage the list of favorite images so we can delete them
    const [favoriteImages, setFavoriteImages] = useState(
        Array(10).fill(null).map((_, index) => ({ id: index, url: gemHero }))
    );

    const handleDelete = (id) => {
        setFavoriteImages(prevImages => prevImages.filter(image => image.id !== id));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="container mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">HELLO, {username}</h1>
                <p className="text-gray-600 mb-6">Your favorite images</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {favoriteImages.length > 0 ? (
                        favoriteImages.map((image) => (
                            <div
                                key={image.id}
                                className="bg-white border border-gray-300 rounded-md shadow-sm aspect-square relative"
                            >
                                <img src={image.url} alt="gem" className="w-full h-full object-cover rounded-md" />
                                
                                {/* Delete button */}
                                <button 
                                    onClick={() => handleDelete(image.id)}
                                    className="absolute bottom-2 right-2 bg-white text-red-500 rounded-full p-2 text-xs shadow-md hover:bg-red-500 hover:text-white transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">No favorite images found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoriteImagesPage;
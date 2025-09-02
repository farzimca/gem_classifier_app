import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../store/auth';
import { toast } from 'sonner';

const FavoriteImagesPage = () => {
    const { user, token } = useAuth();

    const [favoriteImages, setFavoriteImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteImages = async () => {
            if (!token) {
                setIsLoading(false);
                setError("Authentication token not found. Please log in.");
                toast.error("Please log in to view your favorites.");
                return;
            }

            try {
                const response = await fetch('/api/v1/favorites/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch favorite images.');
                }

                const data = await response.json();

                if (data && Array.isArray(data.data)) {
                    setFavoriteImages(data.data);
                } else {
                    throw new Error('Unexpected data format from the server.');
                }
            } catch (err) {
                setError(err.message);
                toast.error(`Error: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchFavoriteImages();
        }
    }, [token]);

    const handleDelete = async (imageId) => {
        // Optimistically update the UI first
        const imageToDelete = favoriteImages.find(img => img._id === imageId);
        setFavoriteImages(prevImages => prevImages.filter(image => image._id !== imageId));
        toast.success("Removing image from favorites...");

        try {
            const response = await fetch(`/api/v1/favorites/${imageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // If the backend call fails, revert the state change
                setFavoriteImages(prevImages => [...prevImages, imageToDelete].sort((a, b) => a.createdAt - b.createdAt));
                throw new Error('Failed to remove image from favorites.');
            }

            toast.success("Image removed successfully!");

        } catch (err) {
            console.error(err.message);
            toast.error("Could not delete image. Please try again.");
            // Revert state on failure
            setFavoriteImages(prevImages => [...prevImages, imageToDelete].sort((a, b) => a.createdAt - b.createdAt));
        }
    };

    let content;
    if (isLoading) {
        content = <p className="text-gray-500 col-span-full text-center">Loading your favorite images... ✨</p>;
    } else if (error) {
        content = <p className="text-red-500 col-span-full text-center">Error: {error}</p>;
    } else if (favoriteImages.length === 0) {
        content = <p className="text-gray-500 col-span-full text-center">You haven't favorited any images yet. 🖼️</p>;
    } else {
        content = (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {favoriteImages.map((image) => (
                    <div
                        key={image._id}
                        className="bg-white border-2 border-purple-200 rounded-xl shadow-md aspect-square relative"
                    >
                        <img
                            src={image.imageUrl}
                            alt="Favorite"
                            className="w-full h-full object-cover rounded-xl"
                            draggable={false}
                        />
                        <button
                            onClick={() => handleDelete(image._id)}
                            className="absolute bottom-1 right-1 bg-white text-red-500 rounded-full p-2.5 text-base shadow-lg cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6 font-sans">
            <div className="container mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    Hello, <span className="text-blue-600">{user?.name || 'User'}</span>! 👋
                </h1>
                <p className="text-gray-600 mb-6 text-lg">Your curated collection of favorite creations.</p>
                {content}
            </div>
        </div>
    );
};

export default FavoriteImagesPage;
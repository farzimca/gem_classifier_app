import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'sonner';

const Profile = () => {
    // The useAuth hook gives us the current user object and a way to update it.
    // The updateUser method is the key to solving the issue.
    const { user, isLoading, token, updateUser } = useAuth();

    // State for user profile details
    const [userProfile, setUserProfile] = useState({
        fullName: "",
        username: "",
        email: "",
        profilePicture: null,
        favoriteCount: 0,
    });

    // State for the fetched history items
    const [historyItems, setHistoryItems] = useState([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);

    // Effect to update user profile details when the user object changes
    // This hook is now more important as we'll be updating the `user` object
    // with the `updateUser` function.
    useEffect(() => {
        if (user) {
            setUserProfile({
                fullName: user.name,
                username: user.username,
                email: user.email,
                profilePicture: user.avatar,
                favoriteCount: user.favorites ? user.favorites.length : 0,
            });
        }
    }, [user]);

    // Effect to fetch upload history when the user's predictions array changes
    useEffect(() => {
        const fetchUploadHistory = async () => {
            if (!user?.predictions?.length || !token) {
                setHistoryItems([]);
                return;
            }

            setIsHistoryLoading(true);
            try {
                // Get the last 8 prediction IDs. The slice(-8) method is used to
                // get the most recent eight items from the end of the array.
                const recentPredictionIds = user.predictions.slice(-8);
                
                // Fetch the full prediction objects from the backend
                const response = await fetch('/api/v1/predictions/get-multiple', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ids: recentPredictionIds }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch upload history');
                }

                const result = await response.json();
                if (result.success) {
                    // Sort by creation date to ensure the most recent are displayed first
                    const sortedHistory = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setHistoryItems(sortedHistory);
                } else {
                    throw new Error(result.message || 'An error occurred fetching history.');
                }
            } catch (err) {
                console.error("Error fetching upload history:", err);
                toast.error(err.message || 'Could not load upload history.');
                setHistoryItems([]);
            } finally {
                setIsHistoryLoading(false);
            }
        };

        fetchUploadHistory();
    }, [user?.predictions, token]); // This dependency array ensures the history is refetched if the predictions array changes.

    // A separate function to handle a user action that updates the user object.
    // This is an example function you might call from a child component (e.g., a "like" button).
    // This part is for demonstration and not directly used in this component's render.
    // The key is to call `updateUser` with the new user object after a successful API call.
    const handleFavoriteToggle = async (predictionId) => {
        try {
            // Assume you have an API endpoint to update favorites
            const response = await fetch(`/api/v1/users/favorites/${predictionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update favorites');
            }

            const updatedUser = await response.json();
            // This is the crucial step: update the global user state.
            // This will cause all components that use the `user` object to re-render.
            updateUser(updatedUser);
            toast.success('Favorites updated successfully!');
        } catch (err) {
            console.error("Error updating favorites:", err);
            toast.error('Could not update favorites.');
        }
    };

    // Handle the initial loading state for user data
    if (isLoading || !user) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading profile...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
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
                            <img src={userProfile.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZWf0l9giN9QZsq3KEs_fZMTy2EiiukBzXg&s"} alt="Profile" className="w-full h-full object-cover" draggable={false}/>
                        </div>

                        {/* Information Boxes with Labels */}
                        <div className="w-full max-w-sm space-y-4">
                            {/* Full Name Box */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                                <div className="bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200">
                                    {userProfile.fullName}
                                </div>
                            </div>

                            {/* Username Box */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                                <div className="bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200">
                                    {userProfile.username}
                                </div>
                            </div>

                            {/* Email Box */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <div className="bg-gray-100 text-gray-800 font-medium px-4 py-3 rounded-lg text-center shadow-sm border border-gray-200">
                                    {userProfile.email}
                                </div>
                            </div>

                            {/* Favorites Link */}
                            <Link to="/favorite-gems" className="block bg-purple-100 text-purple-700 font-bold px-4 py-3 rounded-lg text-center shadow-sm hover:bg-purple-200 transition-colors border border-purple-200">
                                {userProfile.favoriteCount > 0 ? `Favorites (${userProfile.favoriteCount})` : "No Favorites Yet"}
                            </Link>
                        </div>
                    </div>

                    {/* Upload History */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload History</h2>
                        <p className="text-xl text-gray-500 mb-6">Recent Uploads by <span className="text-amber-500">{userProfile.username} </span></p>
                        {isHistoryLoading ? (
                            <div className="text-center text-gray-500 p-8">Loading history...</div>
                        ) : historyItems.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {historyItems.map((item) => (
                                    <div key={item._id} className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center">
                                        <img src={item.imageUrl} alt={item.gemstoneName || `Gemstone prediction`} className="w-full h-full object-cover" draggable={false} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 p-8 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-lg font-medium">Your Upload History is Empty</p>
                                <p className="mt-2 text-sm">Upload a gem image to see your predictions here!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
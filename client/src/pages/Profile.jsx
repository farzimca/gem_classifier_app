import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Profile = () => {
    const { user, isLoading } = useAuth(); // Destructure user and a new isLoading state

    // Use a local state to handle the profile data
    const [userProfile, setUserProfile] = useState({
        fullName: "",
        username: "",
        email: "",
        profilePicture: null,
        favoriteCount: 0,
        uploadHistory: []
    });

    // Use a useEffect hook to update the local state when the user data from the context changes
    useEffect(() => {
        if (user) {
            setUserProfile({
                fullName: user.name,
                username: user.username,
                email: user.email,
                profilePicture: user.avatar,
                favoriteCount: user.favorites ? user.favorites.length : 0,
                uploadHistory: user.predictions || []
            });
        }
    }, [user]); // The effect runs whenever the 'user' object from the context changes

    // Handle the loading state
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
                            <img src={userProfile.profilePicture || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full object-cover" />
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
                            <Link to="/favorites" className="block bg-purple-100 text-purple-700 font-bold px-4 py-3 rounded-lg text-center shadow-sm hover:bg-purple-200 transition-colors border border-purple-200">
                                {userProfile.favoriteCount > 0 ? `Favorites (${userProfile.favoriteCount})` : "No Favorites Yet"}
                            </Link>
                        </div>
                    </div>

                    {/* Upload History */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload History</h2>
                        {userProfile.uploadHistory && userProfile.uploadHistory.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {userProfile.uploadHistory.map((item) => (
                                    <div key={item._id} className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 flex items-center justify-center">
                                        <img src={item.imageUrl} alt={item.alt} className="w-full h-full object-cover" />
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
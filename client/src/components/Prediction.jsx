import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Gemstone color mapping and SVG icons (unchanged)
const gemstoneColors = {
    'Ruby': '#E0115F',
    'Sapphire': '#0F52BA',
    'Emerald': '#50C878',
    'Amethyst': '#9966CC',
    'Onyx': '#36454F',
    'Black Onyx': '#36454F',
    'Sapphire Blue': '#0F52BA',
    'Sapphire Yellow': '#FFD800',
    'Turquoise': '#40E0D0',
};

const getGemstoneColor = (name) => {
    const normalizedName = name?.trim()?.toLowerCase() || '';
    for (const key in gemstoneColors) {
        if (normalizedName.includes(key.toLowerCase())) {
            return gemstoneColors[key];
        }
    }
    return '#6B7280'; // Default gray color
};

const UploadIcon = () => (
    <svg className="w-16 h-16 text-purple-400 group-hover:text-purple-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);
const CameraIcon = () => (
    <svg className="w-8 h-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const FileUploadIcon = () => (
    <svg className="w-8 h-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);
const ResetIcon = () => (
    <svg className="w-12 h-12 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" /></svg>
);

const HeartIcon = ({ isFavorited, className, onClick }) => (
    <svg
        onClick={onClick}
        className={`${className} cursor-pointer transition-transform duration-200 transform hover:scale-110`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorited ? "currentColor" : "none"}
        stroke={isFavorited ? "none" : "white"}
        strokeWidth={isFavorited ? "0" : "1.5"}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const CameraCapture = ({ onCapture, onCancel }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        async function getCameraStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "environment", // Prioritize back camera
                    },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                toast.error("Error accessing camera. Please check permissions.");
                try {
                    const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    if (videoRef.current) {
                        videoRef.current.srcObject = fallbackStream;
                    }
                } catch (fallbackErr) {
                    console.error("Error accessing fallback camera:", fallbackErr);
                    toast.error("No camera available. Please check permissions or device capabilities.");
                    onCancel();
                }
            }
            }

            getCameraStream();

            return () => {
                if (videoRef.current && videoRef.current.srcObject) {
                    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                }
            };
        }, [onCancel]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
            canvasRef.current.toBlob(blob => {
                onCapture(blob);
            }, 'image/jpeg', 0.9);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-lg"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="mt-4 flex space-x-4">
                <button onClick={handleCapture} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Capture</button>
                <button onClick={onCancel} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">Cancel</button>
            </div>
        </div>
    );
};

const Prediction = () => {
    const { isLoggedIn, token } = useAuth();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [predictionResult, setPredictionResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showUploadOptions, setShowUploadOptions] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [currentPredictionId, setCurrentPredictionId] = useState(null);

    const fileInputRef = useRef(null);

    const triggerFileInput = () => {
        fileInputRef.current.click();
        setShowUploadOptions(false);
    };

    const URI = isLoggedIn ? '/api/v1/predictions/user/predict' : '/api/v1/predictions/guest/predict';

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setPredictionResult(null);
            setError('');
            setIsFavorited(false);
            setCurrentPredictionId(null); // Explicitly reset ID here too
        } else {
            setError('Please select a valid image file.');
            setSelectedFile(null);
            setPreviewUrl('');
            setIsFavorited(false);
            setCurrentPredictionId(null); // Explicitly reset ID here too
            toast.error('Please select a valid image file (PNG, JPG, or WEBP).');
        }
    };

    const handleCameraCapture = useCallback((imageBlob) => {
        const capturedFile = new File([imageBlob], "camera-capture.jpg", { type: "image/jpeg" });
        setSelectedFile(capturedFile);
        setPreviewUrl(URL.createObjectURL(capturedFile));
        setPredictionResult(null);
        setError('');
        setIsFavorited(false);
        setCurrentPredictionId(null); // Explicitly reset ID here too
        setShowCamera(false);
    }, []);

    const handlePredict = async () => {
        if (!selectedFile) {
            setError('Please upload an image first.');
            toast.error('Please upload an image first.');
            return;
        }
        setIsLoading(true);
        setError('');
        setPredictionResult(null);
        setCurrentPredictionId(null); // IMPORTANT: Reset ID right before the API call to prevent stale data.

        const formData = new FormData();
        formData.append('image', selectedFile);

        const headers = {};
        if (isLoggedIn) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(URI, {
                method: 'POST',
                body: formData,
                headers: headers
            });

            const result = await response.json();
            console.log("Prediction Result:", result);

            if (!response.ok) {
                throw new Error(result.message || 'An error occurred during prediction.');
            }

            const newPrediction = {
                _id: result.data._id,
                imageUrl: result.data.imageUrl,
                gemstoneName: result.data.gemstoneName,
                isFavorited: result.data.isFavorited || false,
            };

            setPredictionResult({
                image: newPrediction.imageUrl,
                name: newPrediction.gemstoneName,
            });

            // CRITICAL: Set the ID immediately after a successful response.
            setCurrentPredictionId(newPrediction._id);
            setIsFavorited(newPrediction.isFavorited);

            toast.success('Prediction successful!');

        } catch (error) {
            setError(error.message);
            console.error("Prediction API error:", error);
            toast.error(`Prediction failed: ${error.message}`);
            setCurrentPredictionId(null); // Ensure ID is null on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setPreviewUrl('');
        setPredictionResult(null);
        setError('');
        setIsFavorited(false);
        setCurrentPredictionId(null); // Ensure ID is null on manual reset
        setShowUploadOptions(false);
    };

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            toast.error("Please log in to favorite images.");
            setError("Please log in to favorite images.");
            return;
        }

        if (!currentPredictionId) {
            toast.error("No prediction to favorite. The prediction ID is missing.");
            return;
        }

        const newFavoriteStatus = !isFavorited;
        setIsFavorited(newFavoriteStatus);

        let fetchUrl;
        let method;

        if (newFavoriteStatus) {
            fetchUrl = '/api/v1/favorites';
            method = 'POST';
        } else {
            fetchUrl = `/api/v1/favorites/${currentPredictionId}`;
            method = 'DELETE';
        }

        try {
            const response = await fetch(fetchUrl, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: newFavoriteStatus ? JSON.stringify({ predictionId: currentPredictionId }) : null,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update favorite status.');
            }

            const actionMessage = newFavoriteStatus ? "Added to favorites!" : "Removed from favorites.";
            toast.success(actionMessage);
        } catch (err) {
            console.error("Favorite API error:", err);
            setError(err.message);
            setIsFavorited(!newFavoriteStatus);
            toast.error(err.message);
        }
    };

    const handleViewDetails = () => {
        if (predictionResult && predictionResult.name) {
            const gemNameSlug = predictionResult.name.replace(/[\s_]/g, '');
            console.log("Navigating to:", `/gemstone/${gemNameSlug}`);
            navigate(`/gemstone/${gemNameSlug}`);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col items-center justify-center p-4 sm:p-8">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800">Gemstone Prediction</h1>
                    <p className="text-lg text-gray-500 mt-2">Upload an image to identify your gem.</p>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl">
                    <div
                        className="w-full lg:w-1/3 h-80 bg-white rounded-2xl border-2 border-dashed border-gray-300 flex flex-col justify-center items-center text-center p-4 cursor-pointer group hover:border-purple-400 transition-all duration-300 shadow-sm"
                        onClick={!previewUrl ? () => setShowUploadOptions(true) : null}
                    >
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        {previewUrl ? (
                            <div className="relative w-full h-full">
                                <img src={previewUrl} alt="Selected Gem" className="w-full h-full object-cover rounded-xl" />
                                {predictionResult && (
                                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={handleReset}>
                                        <ResetIcon />
                                        <p className="text-white font-semibold">Predict Another</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <UploadIcon />
                                <p className="text-gray-500 font-medium mt-4">Click to upload an image</p>
                                <p className="text-sm text-gray-400">PNG, JPG, or WEBP</p>
                            </>
                        )}
                    </div>

                    <div className="flex-shrink-0">
                        <button onClick={handlePredict} disabled={!selectedFile || isLoading} className="px-10 cursor-pointer py-4 bg-purple-600 text-white rounded-2xl font-bold text-xl hover:bg-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">
                            {isLoading ? 'Analyzing...' : 'PREDICT'}
                        </button>
                    </div>

                    <div className="w-full lg:w-1/3 h-80 p-2 bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center">
                        {predictionResult ? (
                            <div className="relative w-full h-full text-center p-4">
                                <img src={predictionResult.image} alt="Gem Prediction Result" className="w-full h-4/6 object-contain rounded-xl" />
                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-gray-800" style={{ color: getGemstoneColor(predictionResult.name) }}>
                                        {predictionResult.name}
                                    </p>
                                    <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                                        {isLoggedIn && (
                                            <button
                                                onClick={handleToggleFavorite}
                                                className="flex items-center cursor-pointer justify-center px-4 py-2 rounded-full text-white transition-colors text-sm"
                                                style={{ backgroundColor: isFavorited ? '#ef4444' : '#9ca3af' }}
                                            >
                                                <HeartIcon
                                                    isFavorited={isFavorited}
                                                    className="w-5 h-5 mr-2 text-white"
                                                />
                                                {isFavorited ? 'Favorited' : 'Add to Favorites'}
                                            </button>
                                        )}
                                        <button
                                            onClick={handleViewDetails}
                                            className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 p-4">
                                <p className='text-lg'>Prediction results will appear here</p>
                            </div>
                        )}
                    </div>
                </div>

                {error && <p className="mt-8 text-red-500 font-medium">{error}</p>}
            </div>

            {showUploadOptions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40" onClick={() => setShowUploadOptions(false)}>
                    <div className="bg-white rounded-lg p-8 space-y-4" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-semibold text-center mb-4">Choose an option</h3>
                        <button onClick={() => { setShowCamera(true); setShowUploadOptions(false); }} className="w-full flex items-center justify-center cursor-pointer px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-medium">
                            <CameraIcon /> Open Camera
                        </button>
                        <button onClick={triggerFileInput} className="w-full cursor-pointer flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-medium">
                            <FileUploadIcon /> Upload File
                        </button>
                    </div>
                </div>
            )}

            {showCamera && <CameraCapture onCapture={handleCameraCapture} onCancel={() => setShowCamera(false)} />}
        </>
    );
};

export default Prediction;
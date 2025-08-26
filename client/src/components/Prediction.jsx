import React, { useState, useRef, useCallback, useEffect } from 'react';

// --- SVG Icons ---
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


// --- Camera Capture Component ---
const CameraCapture = ({ onCapture, onCancel }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Start the camera stream
    useEffect(() => {
        async function getCameraStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                onCancel(); // Close if camera access is denied
            }
        }
        getCameraStream();

        // Cleanup: stop the stream when the component unmounts
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
            }, 'image/jpeg');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-lg"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="mt-4 flex space-x-4">
                <button onClick={handleCapture} className="px-6 py-2 bg-purple-600 text-white rounded-lg">Capture</button>
                <button onClick={onCancel} className="px-6 py-2 bg-gray-600 text-white rounded-lg">Cancel</button>
            </div>
        </div>
    );
};


const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPredictionResult(null);
      setError('');
    } else {
      setError('Please select a valid image file.');
      setSelectedFile(null);
      setPreviewUrl('');
    }
  };
  
  const handleCameraCapture = useCallback((imageBlob) => {
      const capturedFile = new File([imageBlob], "camera-capture.jpg", { type: "image/jpeg" });
      setSelectedFile(capturedFile);
      setPreviewUrl(URL.createObjectURL(capturedFile));
      setPredictionResult(null);
      setError('');
      setShowCamera(false);
  }, []);


  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please upload an image first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setPredictionResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
        const response = await fetch('http://localhost:4000/api/v1/predictions/guest/predict', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Prediction failed.');
        }
        
        setPredictionResult({
            image: result.data.imageUrl,
            name: result.data.gemstoneName,
        });

    } catch (err) {
        setError(err.message);
        console.error("Prediction API error:", err);
    } finally {
        setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
      fileInputRef.current.click();
      setShowUploadOptions(false);
  };

  // Handles what happens when the user clicks the main upload box
  const handleUploadBoxClick = () => {
      if (predictionResult) {
          // If a prediction has been made, reset everything to start over.
          setSelectedFile(null);
          setPreviewUrl('');
          setPredictionResult(null);
          setError('');
      } else if (!previewUrl) {
          // If there's no image yet, show the upload options.
          setShowUploadOptions(true);
      }
      // If there's a preview but no result, do nothing (user should click PREDICT).
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
            onClick={handleUploadBoxClick}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img src={previewUrl} alt="Selected Gem" className="w-full h-full object-cover rounded-xl" />
                {predictionResult && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ResetIcon />
                        <p className="text-white font-semibold">Predict Another</p>
                        <p className="text-white text-sm">Click to start over</p>
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
            <button onClick={handlePredict} disabled={!selectedFile || isLoading} className="px-10 py-4 bg-purple-600 text-white rounded-2xl font-bold text-xl hover:bg-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">
              {isLoading ? 'Analyzing...' : 'PREDICT'}
            </button>
          </div>

          <div className="w-full lg:w-1/3 h-80 p-2 bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center">
            {predictionResult ? (
              <div className="w-full h-full text-center">
                <img src={predictionResult.image} alt="Gem Prediction Result" className="w-full h-5/6 object-cover rounded-xl" />
                <div className="mt-2">
                  <p className="text-2xl font-bold text-gray-800">{predictionResult.name}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p>Prediction results will appear here</p>
              </div>
            )}
          </div>
        </div>
        
        {error && <p className="mt-8 text-red-500 font-medium">{error}</p>}
      </div>

      {/* Upload Options Modal */}
      {showUploadOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40" onClick={() => setShowUploadOptions(false)}>
              <div className="bg-white rounded-lg p-8 space-y-4" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-xl font-semibold text-center mb-4">Choose an option</h3>
                  <button onClick={() => { setShowCamera(true); setShowUploadOptions(false); }} className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-medium">
                      <CameraIcon /> Open Camera
                  </button>
                  <button onClick={triggerFileInput} className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-medium">
                      <FileUploadIcon /> Upload File
                  </button>
              </div>
          </div>
      )}

      {/* Camera View */}
      {showCamera && <CameraCapture onCapture={handleCameraCapture} onCancel={() => setShowCamera(false)} />}
    </>
  );
};

export default Prediction;

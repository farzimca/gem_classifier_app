import sys
import joblib
import cv2
import numpy as np
import requests
import tempfile
import os
from skimage.feature import local_binary_pattern, graycomatrix, graycoprops

# --- Feature Extraction Parameters (Must match your training script) ---
LBP_RADIUS = 2
LBP_POINTS = 8 * LBP_RADIUS
LBP_METHOD = "uniform"

GLCM_DISTANCES = [1, 2, 3]
GLCM_ANGLES = [0, np.pi / 4, np.pi / 2, 3 * np.pi / 4]
GLCM_PROPS = ["contrast", "dissimilarity", "homogeneity", "energy", "correlation", "ASM"]

COLOR_BINS = 8

# --- Functions for Feature Extraction ---
def extract_color_histogram(image, bins=(COLOR_BINS, COLOR_BINS, COLOR_BINS)):
    hist = cv2.calcHist([image], [0, 1, 2], None, bins, [0, 256, 0, 256, 0, 256])
    cv2.normalize(hist, hist)
    return hist.flatten()

def extract_lbp_features(gray_image):
    lbp = local_binary_pattern(gray_image, LBP_POINTS, LBP_RADIUS, LBP_METHOD)
    (hist, _) = np.histogram(lbp.ravel(),
                             bins=np.arange(0, LBP_POINTS + 3),
                             range=(0, LBP_POINTS + 2))
    hist = hist.astype("float")
    hist /= (hist.sum() + 1e-6)
    return hist

def extract_haralick_features(gray_image):
    glcm = graycomatrix(gray_image, distances=GLCM_DISTANCES,
                        angles=GLCM_ANGLES,
                        symmetric=True, normed=True)
    features = []
    for prop in GLCM_PROPS:
        values = graycoprops(glcm, prop)
        features.extend(values.flatten())
    return np.array(features)

# --- Main Function to Process Image and Extract All Features ---
def process_image(image_path):
    # Read the image
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Could not read the image from path:", image_path)

    # Convert to grayscale for texture features
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Extract all features
    color_features = extract_color_histogram(image)
    lbp_features = extract_lbp_features(gray_image)
    haralick_features = extract_haralick_features(gray_image)

    # Combine all features into a single vector
    all_features = np.hstack([color_features, lbp_features, haralick_features])
    return all_features

def process_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Could not read the image from path: {image_path}")
    # ... (rest of the function is the same)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    color_features = extract_color_histogram(image)
    lbp_features = extract_lbp_features(gray_image)
    haralick_features = extract_haralick_features(gray_image)
    all_features = np.hstack([color_features, lbp_features, haralick_features])
    return all_features




# --- Main Execution Block ---
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No image path provided.", file=sys.stderr)
        sys.exit(1)

    # sys.argv[1] is now a local file path like 'public\temp\image.jpg'
    image_path = sys.argv[1]

    try:
        # No more downloading needed! Directly process the local file.
        features = process_image(image_path)
        
        # Load models and predict
        base_dir = os.path.dirname(__file__)
        model_path = os.path.join(base_dir, 'gem_best_model.pkl')
        encoder_path = os.path.join(base_dir, 'gem_label_encoder.pkl')
        
        model = joblib.load(model_path)
        label_encoder = joblib.load(encoder_path)

        numeric_prediction = model.predict(features.reshape(1, -1))
        text_prediction = label_encoder.inverse_transform(numeric_prediction)

        print(text_prediction[0])

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
import sys
import joblib
import cv2
import numpy as np
import os
from skimage.feature import local_binary_pattern, graycomatrix, graycoprops

# --- 1. Feature Extraction Parameters ---
# These MUST be identical to the parameters used during model training.
LBP_RADIUS = 2
LBP_POINTS = 8 * LBP_RADIUS
LBP_METHOD = "uniform"
GLCM_DISTANCES = [1, 2, 3]
GLCM_ANGLES = [0, np.pi / 4, np.pi / 2, 3 * np.pi / 4]
GLCM_PROPS = ["contrast", "dissimilarity", "homogeneity", "energy", "correlation", "ASM"]
COLOR_BINS = 8

# --- 2. Individual Feature Extraction Functions ---
def extract_color_histogram(image_rgb, bins=(COLOR_BINS, COLOR_BINS, COLOR_BINS)):
    """Calculates a 3D color histogram from an RGB image."""
    hist = cv2.calcHist([image_rgb], [0, 1, 2], None, bins, [0, 256, 0, 256, 0, 256])
    cv2.normalize(hist, hist)
    return hist.flatten()

def extract_lbp_features(gray_image):
    """Extracts LBP texture features from a grayscale image."""
    lbp = local_binary_pattern(gray_image, LBP_POINTS, LBP_RADIUS, LBP_METHOD)
    (hist, _) = np.histogram(lbp.ravel(),
                             bins=np.arange(0, LBP_POINTS + 3),
                             range=(0, LBP_POINTS + 2))
    hist = hist.astype("float")
    hist /= (hist.sum() + 1e-6)
    return hist

def extract_haralick_features(gray_image):
    """Extracts Haralick texture features from a grayscale image."""
    glcm = graycomatrix(gray_image, distances=GLCM_DISTANCES,
                        angles=GLCM_ANGLES, symmetric=True, normed=True)
    features = []
    for prop in GLCM_PROPS:
        values = graycoprops(glcm, prop)
        features.extend(values.flatten())
    return np.array(features)

# --- 3. Main Feature Extraction Pipeline ---
def extract_features_from_image(image_path):
    """Loads an image and extracts the full feature vector."""
    image_bgr = cv2.imread(image_path)
    if image_bgr is None:
        raise ValueError(f"Could not read the image from path: {image_path}")

    # FIX: Convert image to RGB for color features to match training
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    
    # Convert to grayscale for texture features
    gray_image = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)

    # Extract all feature types
    color_features = extract_color_histogram(image_rgb)
    lbp_features = extract_lbp_features(gray_image)
    haralick_features = extract_haralick_features(gray_image)

    # Combine features into a single vector
    all_features = np.hstack([color_features, lbp_features, haralick_features])
    return all_features

# --- 4. Prediction Function ---
def predict_with_loaded_models(features, model_path, encoder_path):
    """Loads the model and encoder to make a prediction."""
    model = joblib.load(model_path)
    label_encoder = joblib.load(encoder_path)

    # Reshape features for a single prediction and predict
    numeric_prediction = model.predict(features.reshape(1, -1))
    text_prediction = label_encoder.inverse_transform(numeric_prediction)
    
    return text_prediction[0]

# --- 5. Main Execution Block ---
def main():
    """Main function to run the prediction script from the command line."""
    if len(sys.argv) < 2:
        print("Error: No image path provided.", file=sys.stderr)
        print("Usage: python predict.py <path_to_image>", file=sys.stderr)
        sys.exit(1)

    image_path = sys.argv[1]

    try:
        # Define paths for the saved model and encoder
        base_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(base_dir, 'random_forest_model.pkl')
        encoder_path = os.path.join(base_dir, 'label_encoder.pkl')

        # 1. Extract features from the input image
        features = extract_features_from_image(image_path)
        
        # 2. Make a prediction using the loaded models
        prediction = predict_with_loaded_models(features, model_path, encoder_path)

        # 3. Print the final result
        print(prediction)

    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
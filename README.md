# Gem Classifier App

Gem Classifier App is a full-stack web application that empowers users to identify and classify gemstones using artificial intelligence. Built with the MERN stack (MongoDB, Express, React, Node.js) and a Python-based machine learning service, GEMX combines modern web technologies with a robust Random Forest model for accurate gemstone predictions.

---

## 🚀 Features

- **Interactive Web Interface:** Intuitive React + Tailwind CSS frontend for uploading gem images, viewing predictions, and managing your profile.
- **AI-Powered Classification:** Python ML service leverages a trained Random Forest model to classify gems from images.
- **RESTful API:** Node.js/Express backend handles authentication, user management, image uploads, and communication with the ML service.
- **User Accounts:** Register, login, edit profile, reset password, and manage favorite gem predictions.
- **Image Uploads:** Secure image upload and storage via Cloudinary integration.
- **Favorites & History:** Save favorite predictions and view your upload history.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Developer & Mentor Credits:** Meet the team and mentor behind GEMX.

---

## 🗂️ Project Structure

```
gem_classifier_app/
├── README.md
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
├── server/           # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── ...
│   ├── package.json
│   └── ...
├── ml_service/       # Python ML microservice
│   ├── app.py
│   ├── requirements.txt
│   └── ml_model/
│       ├── label_encoder.pkl
│       └── random_forest_model.pkl
└── ...
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js & npm
- Python 3.13+
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)
- Docker (optional, for containerized development)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/gem_classifier_app.git
   cd gem_classifier_app
   ```

2. **Setup the ML Service:**
   ```sh
   cd ml_service
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py
   ```
   > The ML service runs on a separate port (default: 5000).

3. **Setup the Backend Server:**
   ```sh
   cd server
   npm install
   npm start
   ```
   > Configure environment variables in `.env` (MongoDB URI, Cloudinary keys, etc.).

4. **Setup the Frontend Client:**
   ```sh
   cd client
   npm install
   npm run dev
   ```
   > The React app runs on port 5173 by default.

---

## ⚡ Usage

- Visit `http://localhost:5173` in your browser.
- Register or login to your account.
- Upload a gemstone image to get AI-powered predictions.
- Save your favorite results and view your prediction history.
- Explore the About page to learn more about the project and team.

---

## 📦 Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, Cloudinary, Multer, JWT, Nodemailer
- **ML Service:** Python, scikit-learn, Flask, Pickle
- **Dev Tools:** Docker, ESLint, Vite

---

## 🔗 Backend API Routes

The backend exposes several RESTful endpoints for client and ML service interaction. Here are the main routes:

### **Auth & User Management**
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- `POST /api/auth/reset-password` — Request password reset
- `PUT /api/user/profile` — Update user profile
- `GET /api/user/profile` — Get current user profile

### **Gem Prediction & Image Upload**
- `POST /api/gems/predict` — Upload a gemstone image and get AI prediction
- `GET /api/gems/history` — Get user's prediction history
- `POST /api/gems/favorite` — Save a prediction to favorites
- `GET /api/gems/favorites` — Get user's favorite predictions

### **Miscellaneous**
- `GET /api/about` — Project and team info

> All protected routes require a valid JWT token in the `Authorization` header.

---

## 👨‍💻 Developers

- **Himanshu Parihar**  
  [GitHub](https://www.github.com/pariharx7) | [LinkedIn](#)

- **Agrim Sharma**  
  [GitHub](https://www.github.com/codeagrim) | [LinkedIn](#)

## 🎓 Mentor

- **Prof. Vinod Sharma**  
  Jammu University  
[Google Scholar Profile](https://scholar.google.com/citations?user=7VeULkEAAAAJ&hl=en)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

---

## 📬 Contact

For support or inquiries, email: [webdevlrn@gmail.com](mailto:webdevlrn@gmail.com)

---

## 🌐 Links

- [Live Demo](#) (if deployed)
- [Documentation](#)

---

> Made with ❤️ ☮︎
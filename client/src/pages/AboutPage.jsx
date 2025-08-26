import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">About GEMX: Gem Classification Project</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Welcome to **GEMX**, a capstone project developed as part of our Master of Computer Applications (MCA) final year curriculum. GEMX is designed to revolutionize the way we interact with and understand gemstones, leveraging cutting-edge machine learning and web technologies to provide an intuitive and powerful classification tool. This project represents the culmination of extensive research, development, and problem-solving, aimed at delivering a practical solution to a niche yet fascinating domain.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        The primary objective of GEMX is to enable users, from enthusiasts to budding gemologists, to **classify gemstones with remarkable accuracy** using image recognition. Traditional gem identification often requires specialized equipment and expert knowledge. GEMX aims to democratize this process by providing an accessible web application where users can upload an image of a gemstone and receive an instant prediction of its type.
      </p>

      {/* --- */}

      <h2 className="text-3xl font-semibold text-gray-800 mt-10 mb-6">Project Vision & Goals 🚀</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Our vision for GEMX extends beyond mere classification. We envision a platform that not only identifies gemstones but also provides comprehensive information about each type, including its properties, origins, and market value. This project addresses the growing demand for AI-driven solutions in various industries, demonstrating how machine learning can be applied to complex visual recognition tasks. Key goals included:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
        <li>Developing a robust **Convolutional Neural Network (CNN)** model capable of distinguishing between various gemstone types.</li>
        <li>Building a **user-friendly web interface** for seamless image upload and result display using **React.js and Tailwind CSS**.</li>
        <li>Integrating the machine learning backend with the frontend via a **RESTful API**.</li>
        <li>Ensuring high **accuracy and reliability** of the classification system.</li>
        <li>Providing educational content and details about identified gemstones.</li>
      </ul>

      {/* --- */}

      <h2 className="text-3xl font-semibold text-gray-800 mt-10 mb-6">Technology Stack 💻</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        GEMX is built upon a modern and scalable technology stack, carefully chosen to ensure performance, maintainability, and a rich user experience:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
        <li>**Frontend:** **React.js** for dynamic and interactive user interfaces, styled with **Tailwind CSS** for rapid and responsive design.</li>
        <li>**Backend (API):** A robust framework (e.g., **Node.js with Express or Python with Flask/Django**) to handle API requests, manage data, and serve the machine learning model.</li>
        <li>**Machine Learning:** **TensorFlow/Keras** or **PyTorch** for building and training the CNN model, with **Python** as the primary language for data preprocessing and model inference.</li>
        <li>**Database:** A suitable database (e.g., **MongoDB or PostgreSQL**) for storing gemstone information and user data (if user features are implemented).</li>
        <li>**Deployment:** Cloud platforms like **AWS, Google Cloud Platform, or Heroku** for hosting the application.</li>
      </ul>

      {/* --- */}

      <h2 className="text-3xl font-semibold text-gray-800 mt-10 mb-6">Challenges & Learning Outcomes 🧠</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Throughout the development of GEMX, we encountered and overcame several significant challenges, which greatly contributed to our learning. These included:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
        <li>**Data Acquisition & Augmentation:** Sourcing and preparing a diverse and high-quality dataset of gemstone images.</li>
        <li>**Model Optimization:** Fine-tuning CNN architectures to achieve optimal accuracy and performance.</li>
        <li>**Integration:** Seamlessly connecting the frontend, backend, and machine learning components.</li>
        <li>**Scalability:** Designing the application to handle a growing number of users and image processing requests.</li>
      </ul>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        This project has provided invaluable experience in full-stack development, machine learning engineering, and project management, preparing us for future roles in the tech industry.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center italic font-medium">
        We believe GEMX stands as a testament to the power of interdisciplinary knowledge and collaborative effort in solving real-world problems. Thank you for exploring our project!
      </p>
    </div>
  );
};

export default AboutPage;
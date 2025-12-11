import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import animatedGemImage from '../assets/Vibrant Geometric Gemstone in Gradient Light.png';
import { SiGooglescholar } from 'react-icons/si';

// SVG Icons as components
const GithubIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// DeveloperCard reusable component
const DeveloperCard = ({ name, image, github, linkedin }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(128, 90, 213, 0.25)" }}
    className="bg-white rounded-lg p-6 text-center cursor-pointer transition-shadow"
  >
    <img
      src={image}
      alt={name}
      className="w-40 h-40 mx-auto rounded-full shadow-md object-cover mb-4"
      loading="lazy"
    />
    <h3 className="text-2xl font-semibold">{name}</h3>
    <div className="flex justify-center space-x-6 mt-3 text-gray-600">
      <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${name} GitHub`} className="hover:text-purple-600">
        <GithubIcon />
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} LinkedIn`} className="hover:text-purple-600">
        <LinkedinIcon />
      </a>
    </div>
  </motion.div>
);

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4"
        >
          About GEMX
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Discover the story, technology, and team behind our mission to revolutionize gemstone classification.
        </motion.p>
      </section>

      {/* Animated Gem Image */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <motion.img
          src={animatedGemImage}
          alt="Animated Gemstones"
          className="w-full rounded-3xl shadow-xl object-cover"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          loading="lazy"
        />
      </section>

      {/* The Idea Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 md:grid md:grid-cols-2 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=""
          >
            <h2 className="text-4xl font-bold mb-4">The Spark of an Idea</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              GEMX was born from a fascination with the intersection of natural beauty and artificial intelligence. Our goal is to democratize gemology, making it accessible to everyone. By leveraging machine learning, we can identify gemstones from a simple image, a task that traditionally requires expert knowledge and specialized tools.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              To build our model, we embarked on an extensive data collection journey, gathering a primary dataset from local shops, gem stores, and high-quality online repositories to ensure our AI is trained on a diverse and accurate range of examples.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mt-8 md:mt-0"
          >
            <p className="text-6xl animate-pulse select-none">💎 → 🧠 → 📱</p>
            <p className="mt-4 text-gray-600 font-semibold">Gem to AI to You</p>
          </motion.div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Development Workflow
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Python & ML',
              desc: 'The core intelligence is a highly accurate Random Forest model, built with Python, and trained to classify gemstones based on their visual features.'
            },
            {
              title: 'Node.js & Express',
              desc: 'A robust RESTful API serves as the bridge, exposing our Python model\'s predictions to the web in a secure and scalable way.'
            },
            {
              title: 'React & Web App',
              desc: 'The user experience is crafted with React and Tailwind CSS, creating a seamless and intuitive interface for interaction.'
            }
          ].map(({ title, desc }, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, boxShadow: '0 8px 20px rgba(128, 90, 213, 0.2)' }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md cursor-default"
            >
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mentor Section with original bg color */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Guidance & Mentorship
          </motion.h2>
          <motion.img
            src="https://admin.jammuuniversity.ac.in/JUProfiles/assets/images/id-152-Pic.jpg"
            alt="Prof. Vinod Sharma"
            className="w-40 h-40 mx-auto rounded-full shadow-lg mb-6 object-cover mask-r-from-97% mask-l-from-97% "
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            loading="lazy"
          />
          <h3 className="text-2xl font-semibold mb-1">
            Prof. Vinod Sharma
            <a href="https://scholar.google.com/citations?user=7VeULkEAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="inline-block align-middle ml-2">
              <SiGooglescholar size={24} className="text-purple-600 hover:text-purple-800 transition-colors" />
            </a>
          </h3>
          <p className="text-purple-600 font-medium mb-3">Jammu University</p>
          <p className="max-w-xl mx-auto leading-relaxed text-gray-700">
            We are immensely grateful for the invaluable guidance and support provided by Prof. Vinod Sharma, whose expertise has been instrumental in shaping this project.
          </p>
        </div>
      </section>

      {/* Developers Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Meet the Developers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <DeveloperCard
            name="Himanshu Parihar"
            image="https://media.licdn.com/dms/image/v2/D4D03AQG7gC8OJStToQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1689518512932?e=2147483647&v=beta&t=RYOiZvcWgouU7Zw5o4XhEqt567e1pqayEtthBGbAIuI"
            github="https://www.github.com/pariharx7"
            draggable={false}
            linkedin="https://www.linkedin.com/in/himanshuparihar07/"
          />
          <DeveloperCard
            name="Agrim Sharma"
            image="https://avatars.githubusercontent.com/u/182859960?v=4"
            github="https://www.github.com/codeagrim"
            linkedin="https://www.linkedin.com/in/agrim-sharma-240b02249/"
            draggable={false}
          />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
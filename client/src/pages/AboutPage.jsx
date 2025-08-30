import React, { useState, useEffect, useRef } from 'react';
import animatedGemImage from '../assets/Vibrant Geometric Gemstone in Gradient Light.png';

// --- Custom Hook for Scroll Animations ---
// This hook detects when an element is visible on the screen
const useIntersectionObserver = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options, isVisible]);

  return [containerRef, isVisible];
};


// --- SVG Icons ---
const GithubIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const LinkedinIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

// AnimatedSection component to wrap content that fades in on scroll
const AnimatedSection = ({ children }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <div ref={ref} className={`transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`}>
            {children}
        </div>
    );
};


const AboutPage = () => {
  // Placeholder images - replace with actual image paths
  // const animatedGemImage = "https://placehold.co/1200x600/1e293b/93c5fd?text=Animated+Gems+Visualization";
  const mentorImage = "https://admin.jammuuniversity.ac.in/JUProfiles/assets/images/id-152-Pic.jpg";
  const dev1Image = "https://placehold.co/400x400/e2e8f0/334155?text=Himanshu+Parihar";
  const dev2Image = "https://pbs.twimg.com/profile_images/1659973399714713600/8z4NWowv_400x400.jpg";


  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-tight mb-4">
              About GEMX
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the story, technology, and team behind our mission to revolutionize gemstone classification.
            </p>
        </AnimatedSection>
      </div>

      {/* Animated Image Placeholder */}
      <div className="container mx-auto px-6 mb-16">
        <AnimatedSection>
          
            <img src={animatedGemImage} alt="Animated Gemstones" className="w-full h-auto object-cover rounded-2xl shadow-lg" />
        </AnimatedSection>
      </div>

      {/* The Idea Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div>
              <h2 className="text-4xl font-bold mb-4">The Spark of an Idea</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                GEMX was born from a fascination with the intersection of natural beauty and artificial intelligence. Our goal is to democratize gemology, making it accessible to everyone. By leveraging machine learning, we can identify gemstones from a simple image, a task that traditionally requires expert knowledge and specialized tools.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                To build our model, we embarked on an extensive data collection journey, gathering a primary dataset from local shops, gemstores, and high-quality online repositories to ensure our AI is trained on a diverse and accurate range of examples.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="text-center">
               <p className="text-6xl">💎 → 🧠 → 📱</p>
               <p className="mt-4 text-gray-600 font-semibold">Gem to AI to You</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Building Workflow Section */}
      <div className="container mx-auto px-6 py-16">
        <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12">Our Development Workflow</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <AnimatedSection>
            <div className="p-6 bg-white rounded-xl shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-2">Python & ML</h3>
              <p className="text-gray-600">The core intelligence is a highly accurate **Random Forest** model, built with Python, and trained to classify gemstones based on their visual features.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="p-6 bg-white rounded-xl shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-2">Node.js & Express</h3>
              <p className="text-gray-600">A robust RESTful API serves as the bridge, exposing our Python model's predictions to the web in a secure and scalable way.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="p-6 bg-white rounded-xl shadow-md transform hover:-translate-y-2 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-2">React & Web App</h3>
              <p className="text-gray-600">The user experience is crafted with React and Tailwind CSS, creating a seamless and intuitive interface for you to interact with our technology.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Mentor and Developers Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          {/* Mentor */}
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">Guidance & Mentorship</h2>
              <img src={mentorImage} alt="Prof. Vinod Sharma" className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg mask-r-from-97% mask-l-from-97% " />
              <h3 className="text-2xl font-semibold">Prof. Vinod Sharma</h3>
              <p className="text-purple-600 font-medium">Jammu University</p>
              <p className="text-gray-700 mt-2">
                We are immensely grateful for the invaluable guidance and support provided by Prof. Vinod Sharma, whose expertise has been instrumental in shaping this project.
              </p>
            </div>
          </AnimatedSection>

          {/* Developers */}
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12">Meet the Developers</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Developer 1 */}
            <AnimatedSection>
                <div className="text-center p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={dev1Image} alt="Himanshu Parihar" className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg" />
                  <h3 className="text-2xl font-semibold">Himanshu Parihar</h3>
                  <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors"><GithubIcon /></a>
                    <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors"><LinkedinIcon /></a>
                  </div>
                </div>
            </AnimatedSection>
            {/* Developer 2 */}
            <AnimatedSection>
                <div className="text-center p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={dev2Image} alt="Agrim Sharma" className="w-40 h-40 rounded-full mx-auto mb-4 shadow-lg" />
                  <h3 className="text-2xl font-semibold">Agrim Sharma</h3>
                  <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors"><GithubIcon /></a>
                    <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors"><LinkedinIcon /></a>
                  </div>
                </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

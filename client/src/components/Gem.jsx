import React from 'react';
import { FaDollarSign, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';

const GemPage = ({ 
  gem_title, 
  gem_image, 
  small_description, 
  about_the_gem, 
  market_value, 
  learn_more_link,
  title_color_class = "from-purple-600 to-pink-500"
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-6 sm:p-10 my-8 border border-gray-200">

        {/* Header Section: Gem Image and Core Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 items-center">
          <div className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0 relative overflow-hidden rounded-xl shadow-lg border border-gray-300">
            <img
              src={gem_image}
              alt={gem_title}
              className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-lg font-semibold">{gem_title}</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 text-center md:text-left">
            <h1 className={`text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${title_color_class} mb-3 leading-tight`}>
              {gem_title}
            </h1>
            <p className="text-xl text-gray-700 mb-6 font-medium italic">
              {small_description}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-5 flex items-center">
            <FaInfoCircle className="text-purple-600 mr-3 text-2xl" /> All About {gem_title}
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              {about_the_gem}
            </p>
          </div>
        </div>

        {/* Market Value Table Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-5 flex items-center">
            <FaDollarSign className="text-purple-600 mr-3 text-2xl" /> Market Value
          </h2>
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-inner border border-gray-100">
            <table className="min-w-full text-left text-gray-800">
              <thead className="bg-purple-100 text-purple-800 font-semibold text-sm uppercase tracking-wider">
                <tr>
                  {/* Updated Table Headers */}
                  <th className="px-6 py-3 border-b-2 border-purple-200">Quality Level</th>
                  <th className="px-6 py-3 border-b-2 border-purple-200">Color & Origin</th>
                  <th className="px-6 py-3 border-b-2 border-purple-200">Matrix & Treatment</th>
                  <th className="px-6 py-3 border-b-2 border-purple-200">Price Per Carat (INR)</th>
                </tr>
              </thead>
              <tbody>
                {/* Updated Table Rows with new keys */}
                {market_value.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 border-b border-gray-200 font-bold">{item.quality_level}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{item.color_and_origin}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{item.matrix_and_treatment}</td>
                    <td className="px-6 py-4 border-b border-gray-200 font-bold text-purple-700">{item.price_per_carat_inr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Learn More Link */}
        <div className="mt-10 text-center md:text-left">
          <a
            href={learn_more_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
          >
            <FaExternalLinkAlt className="mr-3" /> Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default GemPage;
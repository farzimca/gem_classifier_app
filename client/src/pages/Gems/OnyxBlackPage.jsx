import React from 'react';
import GemPage from '../../components/Gem';

const OnyxBlackPage = () => {
  const onyxBlackData = {
    gem_title: "Black Onyx",
    gem_image: "https://imgs.search.brave.com/IuYkXoFP9DU9CLSsTYSVfLfObo_mXlhnFhSfMgV_x0Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z2VtZmFtZS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDkvQmxhY2stT255/eC1BSzAzMjgzLTIt/NjAweDYwMC5qcGc",
    small_description: "Black onyx is a deep black variety of the mineral chalcedony, which is a form of quartz. It has been used for centuries in jewelry and carvings and is known for its elegant, solid color and protective symbolism.",
    about_the_gem: `Black Onyx is a deep, opaque black gemstone that belongs to the chalcedony family, a microcrystalline form of quartz. While true onyx often has parallel bands of black and white, the uniform black variety is the most well-known and commercially popular. It is a moderately durable stone, with a hardness of 6.5 to 7 on the Mohs scale, making it suitable for a wide range of jewelry. Due to its solid color and affordability, it is a versatile gem that has been used in carvings and ornamental objects for centuries.

Indian Name and Significance

In India, black onyx is commonly known by two names: Sulemani Akik (सुलेमानी अकीक) or simply Akik (अकीक), which is also a term for agate. The name "Sulemani" is derived from the Arabic word for King Solomon, as it is associated with his protective ring.

The significance of black onyx in Indian culture is primarily spiritual and astrological. It is widely considered a powerful protective stone that absorbs and transmutes negative energy. In Vedic astrology, black onyx is associated with the planet Saturn (Shani) and is believed to help the wearer with self-control, discipline, and grounding. It is thought to provide a shield against evil and ill wishes, promoting emotional stability and mental clarity. It is often recommended for individuals who feel stressed or anxious and is also considered a stone of strength and courage.`,
    market_value: [
      {
        "quality_level": "Commercial",
        "color_and_origin": "Opaque black, often with a dull finish. May be sourced from various locations.",
        "matrix_and_treatment": "Minor surface blemishes, scratches, or uneven color; commonly dyed or heat-treated.",
        "price_per_carat_inr": "₹20 - ₹150"
      },
      {
        "quality_level": "Good",
        "color_and_origin": "Solid, deep black with a uniform color. Often from Brazil or India.",
        "matrix_and_treatment": "No visible blemishes; well-cut and polished to a good luster. Typically unheated and untreated.",
        "price_per_carat_inr": "₹150 - ₹500"
      },
      {
        "quality_level": "Fine",
        "color_and_origin": "A jet, consistent black with a brilliant, high polish. Usually from Brazil.",
        "matrix_and_treatment": "Completely clean and free of any flaws or surface imperfections. Certified as natural and untreated.",
        "price_per_carat_inr": "₹500 - ₹2,500+"
      }
    ],
    learn_more_link: "https://www.dwsjewellery.com/blog/black-onyx-gemstone/",
    title_color_class: "from-gray-800 to-black"
  };

  return <GemPage {...onyxBlackData} />;
};

export default OnyxBlackPage;
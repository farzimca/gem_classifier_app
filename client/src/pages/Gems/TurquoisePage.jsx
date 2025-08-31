import React from 'react';
import GemPage from '../../components/Gem';

const TurquoisePage = () => {
  const turquoiseData = {
    gem_title: "Turquoise",
    gem_image: "https://imgs.search.brave.com/w5DD-AY5OfGgatd5w7od1rAMDqGk0Vd_2LAcLErqXz4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzExLzYyLzgxLzQy/LzM2MF9GXzExNjI4/MTQyMzhfWDZEYzRh/TzR1WG1Hb3hkTWxk/ZXlJS0RWcVFhaVJB/czcuanBn",
    small_description: "Turquoise is an opaque, blue-to-green mineral that has been highly valued as a gemstone and ornamental stone for thousands of years. It is known for its unique color and is believed to bring good fortune and protection.",
    about_the_gem: `Turquoise is an opaque mineral that has been highly prized for millennia for its striking color, which can range from a sky blue to a greenish-blue. Its unique hue is caused by the presence of copper and aluminum in its chemical composition. The name "turquoise" is believed to be derived from the French word for "Turkish," as the stone was first brought to Europe from Turkish trade routes. It often has black, gray, or brown spider-web-like veins running through it, which is known as a matrix. With a hardness of 5 to 6 on the Mohs scale, it is a softer gemstone that is best suited for cabochons or beads.

Indian Name and Significance

In India, turquoise is commonly known as Firoza (फ़िरोज़ा).

The significance of Firoza is deeply embedded in ancient beliefs and has a strong connection to both Persian and Mughal traditions. It is widely regarded as a protective and healing stone, believed to shield the wearer from negative energy, evil influences, and misfortune. Firoza is also associated with good fortune and is considered a symbol of friendship and love, as its color is said to change with the wearer's health and emotions. In some traditions, it is also linked to the planet Jupiter and is believed to promote wisdom, wealth, and success. Its calming blue color is thought to bring peace of mind and emotional balance, making it a popular choice for those seeking spiritual tranquility`,
    market_value: [
        {
    "quality_level": "Commercial",
    "color_and_origin": "Pale, greenish-blue, or heavily mottled with a matrix. Sourced from various locations.",
    "matrix_and_treatment": "Often dyed, stabilized with plastic polymers, or reconstituted to enhance color and durability.",
    "price_per_carat_inr": "₹100 - ₹1,500"
  },
  {
    "quality_level": "Good",
    "color_and_origin": "Medium, uniform blue color. May have a visible spiderweb matrix. Sourced from the USA or Tibet.",
    "matrix_and_treatment": "Stabilized to prevent color change and improve durability, which is a common and accepted practice.",
    "price_per_carat_inr": "₹1,500 - ₹5,000"
  },
  {
    "quality_level": "Fine",
    "color_and_origin": "Rich, saturated, pure sky-blue color. This is the classic \"Persian blue.\" Sourced from Iran or high-quality American mines.",
    "matrix_and_treatment": "Minimal to no visible matrix. Natural and untreated. Very rare and highly prized.",
    "price_per_carat_inr": "₹5,000 - ₹25,000+"
  }
  ],
    learn_more_link: "https://en.wikipedia.org/wiki/Turquoise",
    title_color_class: "from-cyan-500 to-blue-500",
  };

  return <GemPage {...turquoiseData} />;
};

export default TurquoisePage;
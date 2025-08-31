import React from 'react';
import GemPage from '../../components/Gem';

const EmeraldPage = () => {
  const emeraldData = {
    gem_title: "Emerald",
    gem_image: "https://imgs.search.brave.com/zAHvxFxNgUNBIQf7WlOHRiPgBkz3VaWdYfFMoIx1ipU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4x/MS5iaWdjb21tZXJj/ZS5jb20vcy1kZWNn/cmdncTU0L2ltYWdl/cy9zdGVuY2lsLzUw/MHg2NTkvcHJvZHVj/dHMvMTI4NjgwLzE0/OTY3Ny8xNDk2Nzdf/XzY0NjQ4LjE2Nzgy/Mjc3OTkuanBnP2M9/MQ",
    small_description: `Emerald is a precious gemstone and a variety of the mineral beryl, renowned for its vivid green color. Its beauty and rarity have made it a symbol of royalty and new beginnings for centuries.`,
    about_the_gem: `Emerald is a precious gemstone and a variety of the mineral beryl, celebrated for its rich, vibrant green to bluish-green color. This captivating hue is caused by trace amounts of chromium and/or vanadium within the crystal structure. Unlike many other gemstones, emeralds are known for having inclusions, which are often described as a "jardin" (French for garden) due to their mossy, internal appearance. With a hardness of 7.5 to 8 on the Mohs scale, they are durable enough for most jewelry but require careful handling.

Indian Name and Significance

In India, the emerald is most commonly known as Panna (पन्ना).

The significance of the emerald in Indian culture is deeply rooted in astrology and spirituality. It is considered one of the nine sacred gems, the Navratna. According to Vedic astrology, the emerald is associated with the planet Mercury (Budh). Wearing a Panna is believed to strengthen the influence of this planet, bestowing the wearer with enhanced intelligence, communication skills, and wisdom. It is also thought to bring good fortune, prosperity, and emotional balance, and is a popular choice for those working in creative or intellectual fields`,
    market_value: [
       {
    "quality_level": "Commercial",
    "color_and_origin": "Pale to medium green, often with a yellowish tint. May be from various sources including Brazil or India.",
    "matrix_and_treatment": "Highly included with low transparency; often heavily treated to fill fractures.",
    "price_per_carat_inr": "₹1,000 - ₹15,000"
  },
  {
    "quality_level": "Good",
    "color_and_origin": "Medium green with good saturation and tone. Typically from Brazil or Zambia.",
    "matrix_and_treatment": "Eye-visible inclusions, but do not compromise the gem's overall appearance. Often treated with a clear oil.",
    "price_per_carat_inr": "₹15,000 - ₹80,000"
  },
  {
    "quality_level": "Fine",
    "color_and_origin": "Rich, vivid green with strong saturation. Often from Zambia.",
    "matrix_and_treatment": "Eye-clean (no inclusions visible to the naked eye); may have minor oiling, which is a common and accepted treatment.",
    "price_per_carat_inr": "₹80,000 - ₹3,00,000"
  },
  {
    "quality_level": "Exceptional",
    "color_and_origin": "The most vibrant, pure, and deep green color, often called 'Colombian Green.' Exclusively from Colombia.",
    "matrix_and_treatment": "Internally flawless with exceptional transparency; a rare, certified, and untreated stone.",
    "price_per_carat_inr": "₹3,00,000+ to ₹10,00,000+"
  }
    ],
    learn_more_link: "https://en.wikipedia.org/wiki/Emerald",
    title_color_class: "from-green-600 to-teal-500"
  };

  return <GemPage {...emeraldData} />;
};

export default EmeraldPage;
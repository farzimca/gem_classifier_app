import React from 'react';
import GemPage from '../../components/Gem';

const SapphireYellowPage = () => {
  const sapphireYellowData = {
    gem_title: "Sapphire Yellow",
    gem_image: "https://imgs.search.brave.com/ud-4raQBYCI4FA6t9gdOmtbrdl5p7nvRGd2JxYSTIg8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pb24u/amFtZXNhbGxlbi5j/b20vc2dtZGlyZWN0/L3Bob3RvSUQvMzY0/ODY4NzgvR2Vtc3Rv/bmUvOTkzOTQvbmwv/R2Vtc3RvbmUtRW1l/cmFsZC0yLjAwLUNh/cmF0XzRfZmlyc3Rf/LmpwZw",
    small_description: "Yellow sapphire is a precious gemstone, a yellow variety of the mineral corundum. In Vedic astrology, it is known as Pukhraj and is associated with the planet Jupiter, bringing good fortune and wisdom to the wearer.",
    about_the_gem: `Yellow Sapphire is a precious gemstone, a yellow variety of the mineral corundum. It is highly valued for its beautiful, bright yellow to golden color, which is caused by trace amounts of iron within its crystalline structure. Known for its remarkable hardness (9 on the Mohs scale), it is a very durable gem, making it an excellent choice for daily wear jewelry. While often compared to yellow diamonds, yellow sapphires offer a vibrant color at a more accessible price point.

Indian Name and Significance

In India, the yellow sapphire is popularly known as Pukhraj (पुखराज).

Its significance is deeply rooted in Vedic astrology, where it is considered one of the most powerful and auspicious gemstones, representing the planet Jupiter (Guru), the largest and most benevolent planet in the solar system. Wearing Pukhraj is believed to strengthen the positive influence of Jupiter, which rules over wisdom, prosperity, good fortune, and knowledge. It is thought to bring wealth, success, and professional advancement, particularly for those in fields of law, education, and finance. Furthermore, it is believed to promote marital harmony, fertility, and emotional balance, providing a sense of calm and clarity to the wearer.`,
    market_value: [
         {
    "quality_level": "Commercial",
    "color_and_origin": "Pale to light yellow, often with a brownish tint. May be sourced from various locations.",
    "matrix_and_treatment": "Visible inclusions; often heavily heat-treated or glass-filled to enhance color.",
    "price_per_carat_inr": "₹1,000 - ₹5,000"
  },
  {
    "quality_level": "Good",
    "color_and_origin": "Medium yellow with good saturation, may have a slight greenish tint. Often from Thailand or other sources.",
    "matrix_and_treatment": "Moderate inclusions that do not significantly impact the gem's transparency; typically heat-treated.",
    "price_per_carat_inr": "₹5,000 - ₹15,000"
  },
  {
    "quality_level": "Fine",
    "color_and_origin": "Rich, vivid, or golden yellow with a uniform, pure hue. Often from Sri Lanka (Ceylon).",
    "matrix_and_treatment": "Eye-clean (no inclusions visible to the naked eye); may be heat-treated.",
    "price_per_carat_inr": "₹15,000 - ₹40,000"
  },
  {
    "quality_level": "Exceptional",
    "color_and_origin": "A deep, brilliant, and pure lemon-yellow color with excellent saturation. Exclusively from Sri Lanka (Ceylon).",
    "matrix_and_treatment": "Flawless transparency with very few to no inclusions; natural and certified as unheated and untreated.",
    "price_per_carat_inr": "₹40,000+ to lakhs"
  }
  ],
    learn_more_link: "https://www.thenaturalsapphirecompany.com/education/sapphire-colors-varieties/yellow-sapphires/",
    title_color_class: "from-yellow-400 to-amber-500" 
  };

  return <GemPage {...sapphireYellowData} />;
};

export default SapphireYellowPage;
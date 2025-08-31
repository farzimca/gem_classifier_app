import React from 'react';
import GemPage from '../../components/Gem';

const RubyPage = () => {
  const rubyData = {
    gem_title: "Ruby",
    gem_image: "https://imgs.search.brave.com/kRvPekM5pFdfHBjq3Y84erAu_4hDoheOUD7JWFw9ik8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4x/MS5iaWdjb21tZXJj/ZS5jb20vcy1kZWNn/cmdncTU0L2ltYWdl/cy9zdGVuY2lsLzUw/MHg2NTkvcHJvZHVj/dHMvNDE0Nzc0LzI5/NzI2OS8xODY1M18y/MDczNl9fODE5ODQu/MTcyMzQzMzE5MC5q/cGc_Yz0x",
    small_description: "Ruby is a precious gemstone and a variety of the mineral corundum, known for its deep red color. It is a symbol of passion and power, and one of the most highly valued colored gemstones in the world.",
    about_the_gem: `Ruby is one of the four cardinal precious gemstones, a stunning red variety of the mineral corundum. Its fiery color, ranging from a deep pink to a vibrant, blood-red, is caused by the presence of the trace element chromium. Rubies are incredibly hard, rating a 9 on the Mohs scale, just below diamonds, making them an excellent choice for any type of jewelry. Due to their rarity in high-quality forms, especially in larger sizes, fine rubies are among the most valuable colored gemstones in the world.

Indian Name and Significance

In India, the ruby is most commonly known as Manik (माणिक) or Manikya (माणिक्य).

The significance of the ruby in Indian culture is profound, especially in Vedic astrology. It is considered one of the nine sacred gems (Navratna) and is the gemstone for the Sun, which is regarded as the king of all planets. Wearing a Manik is believed to strengthen the Sun's influence, bestowing the wearer with vitality, power, authority, and confidence. It is also thought to bring good fortune, fame, and success, particularly to those in leadership positions. Historically, rubies have been associated with royalty and were believed to bring protection and a long, healthy life to the wearer.`,
    market_value: [
      {
        "quality_level": "Commercial",
        "color_and_origin": "Pale red or pinkish-red with dull undertones. Often from Thailand or India; typically heat-treated or glass-filled.",
        "matrix_and_treatment": "Highly included; transparency is low.",
        "price_per_carat_inr": "₹1,000 - ₹15,000"
      },
      {
        "quality_level": "Good",
        "color_and_origin": "Medium red with good saturation. Often from Mozambique or Madagascar; typically heat-treated.",
        "matrix_and_treatment": "Moderate inclusions, but still transparent and with good brilliance.",
        "price_per_carat_inr": "₹15,000 - ₹80,000"
      },
      {
        "quality_level": "Fine",
        "color_and_origin": "Rich, vivid 'pigeon blood' red with high saturation. Often from Mozambique; may be unheated.",
        "matrix_and_treatment": "Eye-clean (no inclusions visible to the naked eye); transparent with excellent light return.",
        "price_per_carat_inr": "₹80,000 - ₹3,00,000"
      },
      {
        "quality_level": "Exceptional",
        "color_and_origin": "A deep, pure, and vibrant 'pigeon blood' red. Exclusively from Burma (Myanmar); certified as natural and untreated.",
        "matrix_and_treatment": "Internally flawless or with very few, tiny inclusions. A true rarity.",
        "price_per_carat_inr": "₹3,00,000+ to ₹10,00,000+"
      }
    ],
    learn_more_link: "https://en.wikipedia.org/wiki/Ruby",
    title_color_class: "from-red-600 to-pink-600"
  };

  return <GemPage {...rubyData} />;
};

export default RubyPage;
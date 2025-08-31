import React from 'react';
import GemPage from '../../components/Gem';

const AmethystPage = () => {
  const amethystData = {
    gem_title: "Amethyst",
    gem_image: "https://imgs.search.brave.com/RPjpEnXu3oxJPdPIOqEfFYnjb-7eYLVQfgOxXeQ5gq0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9saXZl/cGxhdGZvcm1zLXBy/b2R1Y3Rpb24uYi1j/ZG4ubmV0L3RlbmFu/dHMvZ3IvdXBsb2Fk/cy9jb250ZW50L3Nz/Z2J3ZGV4bzh6NmJp/b2IucG5n",
    small_description: "Amethyst is a purple variety of quartz known for its beautiful violet hues. Historically, it was believed to protect the wearer from intoxication and has been a prized gemstone for centuries.",
    about_the_gem: `Amethyst is a popular semi-precious gemstone and a variety of the mineral quartz, known for its beautiful purple to violet hue. Its color is a result of iron impurities within the crystal and natural irradiation. With a hardness of 7 on the Mohs scale, amethyst is a durable and versatile gem suitable for all types of jewelry. Historically, it has been associated with qualities of sobriety and mental clarity, as its name comes from the ancient Greek word amethystos, meaning "not intoxicated."

Indian Name and Significance

In India, amethyst is commonly known as Jamunia (जमुनिया) or Katela (कटैला).

Its significance in Indian culture is deeply rooted in spirituality and astrology. While not one of the primary nine planetary gems (Navratna), it is a very popular and affordable substitute for Blue Sapphire (Neelam), as both are associated with the planet Saturn (Shani). According to Vedic astrology, wearing a Jamunia stone is believed to counteract the negative effects of Saturn's influence, such as during the Shani Sade Sati period. It is thought to bring mental clarity, peace, and emotional balance, helping to relieve stress, anxiety, and insomnia. Amethyst is also believed to enhance intuition, spiritual awareness, and the wearer's sense of discipline and wisdom.`,
    market_value: [
     {
    "quality_level": "Commercial",
    "color_and_origin": "Pale, dull, or yellowish-green with low saturation. Often from China, Tibet, or India.",
    "matrix_and_treatment": "Typically has a prominent, unattractive matrix; may be dyed or stabilized.",
    "price_per_carat_inr": "₹300 - ₹1,500"
  },
  {
    "quality_level": "Good",
    "color_and_origin": "Medium sky blue to bluish-green. Often from American mines (e.g., Arizona).",
    "matrix_and_treatment": "Moderate matrix (spider-web patterns) that can be visually appealing; stabilized to improve hardness.",
    "price_per_carat_inr": "₹1,500 - ₹5,000"
  },
  {
    "quality_level": "Fine",
    "color_and_origin": "Pure, vibrant blue with high saturation, a color often associated with the 'Sleeping Beauty' mine.",
    "matrix_and_treatment": "Minimal to no visible matrix; may be a natural cabochon or a stabilized piece.",
    "price_per_carat_inr": "₹5,000 - ₹15,000"
  },
  {
    "quality_level": "Exceptional",
    "color_and_origin": "A deep, uniform, and intense 'Persian blue' color. Typically from Iran (Nishapur).",
    "matrix_and_treatment": "Completely clean, without any matrix; a rare, naturally hard, and untreated stone.",
    "price_per_carat_inr": "₹15,000+ up to ₹1,00,000+"
  }
  ],
    learn_more_link: "https://en.wikipedia.org/wiki/Amethyst",
    title_color_class: "from-purple-700 to-indigo-500"
  };

  return <GemPage {...amethystData} />;
};

export default AmethystPage;
import React from 'react';
import GemPage from '../../components/Gem';

const SapphireBluePage = () => {
  const sapphireBlueData = {
    gem_title: "Sapphire Blue",
    gem_image: "https://imgs.search.brave.com/zfeRyKTJtkiSnTsvU5SDYvp2HX45vbgD79o7c1huFtY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/anVwaXRlcmdlbS5j/b20vbWVkaWEvY2F0/YWxvZy9wcm9kdWN0/L2NhY2hlLzk1MWJm/Y2U3N2JlMWM0ZDVh/YmY0ZGUzOWQ4MDhh/NzZhLzEvXy8xLjMw/X2JsdWVfc2FwcGhp/cmVfc2t1XzM3NzVf/MS5qcGc",
    small_description: "Sapphire is a precious gemstone and a variety of the mineral corundum, most famous for its stunning blue color. Symbolizing wisdom and royalty, it is a highly durable and sought-after gem, second only to diamond in hardness.",
    about_the_gem: `Blue Sapphire is a magnificent precious gemstone, a variety of the mineral corundum, known for its captivating blue hue. Its color is caused by the presence of trace elements like iron and titanium. Sapphires are incredibly hard, ranking as a 9 on the Mohs scale, second only to diamonds, which makes them highly durable and a popular choice for all types of jewelry. While the blue variety is the most famous, sapphires can be found in a wide range of other colors, including pink, yellow, and green.

Indian Name and Significance

In India, the blue sapphire is called Neelam (नीलम).

The significance of the Neelam stone in Indian culture and Vedic astrology is immense and multifaceted. It is considered one of the most powerful and fastest-acting gemstones among the nine sacred gems, the Navratna. Neelam is associated with the planet Saturn (Shani), which is known for its role in karma, justice, and discipline.

It is believed that wearing a Neelam can bring about swift changes in a person's life. If it suits the wearer, it can bring immense prosperity, good fortune, and success in business and career. However, if it is not compatible with the wearer's astrological chart, it can have negative effects. For this reason, it is highly recommended to consult a qualified astrologer before wearing it. Neelam is also believed to provide protection against negative energies and to promote mental clarity, wisdom, and emotional stability.`,
    market_value: [
        {
    "quality_level": "Commercial",
    "color_and_origin": "Pale, light, or overly dark navy blue, often from Thailand or Africa.",
    "matrix_and_treatment": "Numerous visible inclusions; often heavily treated to enhance color.",
    "price_per_carat_inr": "₹1,000 - ₹15,000"
  },
  {
    "quality_level": "Good",
    "color_and_origin": "Medium to strong blue, good saturation. Sourced from Sri Lanka or Madagascar.",
    "matrix_and_treatment": "Moderate inclusions, typically eye-clean; often heat-treated.",
    "price_per_carat_inr": "₹15,000 - ₹50,000"
  },
  {
    "quality_level": "Fine",
    "color_and_origin": "Rich, vivid, or 'Royal Blue' color. Sourced from Sri Lanka or Burma (Myanmar).",
    "matrix_and_treatment": "Eye-clean with high transparency; may be heat-treated.",
    "price_per_carat_inr": "₹50,000 - ₹2,00,000"
  },
  {
    "quality_level": "Exceptional",
    "color_and_origin": "'Cornflower Blue' or velvety blue, with superb saturation. Most famously from Kashmir.",
    "matrix_and_treatment": "Eye-clean with minimal inclusions; natural and untreated.",
    "price_per_carat_inr": "₹2,00,000 - ₹10,00,000+"
  }
  ],
    learn_more_link: "https://www.americangemsociety.org/birthstones/september-birthstone/sapphire-history/",
    title_color_class: "from-blue-600 to-cyan-500"
  };

  return <GemPage {...sapphireBlueData} />;
};

export default SapphireBluePage;
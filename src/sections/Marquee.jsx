import React from 'react';
import { motion } from 'framer-motion';

// An array holding the URLs for your three product images.
const productImages = [
  "https://fokus.shop/cdn/shop/files/Frame_3_1.png?v=1736231978",
  "https://fokus.shop/cdn/shop/files/Frame_1.png?v=1736231978",
  "https://fokus.shop/cdn/shop/files/Frame_2_2.png?v=1737091469",
];

// This component renders the row of rotated images.
const MarqueeRow = () => {
  // Repeat the images to create a long, continuous row for the loop.
  const repeatedImages = [...productImages, ...productImages, ...productImages, ...productImages, ...productImages];

  return (
    <div className="flex flex-shrink-0 items-center justify-around space-x-4 sm:space-x-12 px-2 sm:px-6">
      {repeatedImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Fokus product shot ${i + 1}`}
          className="h-16 sm:h-25 w-auto -rotate-90"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/200x300/FFDF20/000000?text=Fokus";
          }}
        />
      ))}
    </div>
  );
};

const Marquee = ({ speed = 25, direction = 'left' }) => {
  const marqueeVariants = {
    animate: {
      // --- THE FIX ---
      // The animation should translate by -50% (half the total width) to be seamless.
      // Translating by -100% moves both copies off-screen, creating a gap.
      x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <div className="relative flex w-full overflow-x-hidden bg-[#FFF5BD]">
      <motion.div
        className="flex flex-shrink-0 whitespace-nowrap py-4"
        variants={marqueeVariants}
        animate="animate"
      >
        {/* Render the row of images twice. The total width is now 200% of a single row. */}
        <MarqueeRow />
        <MarqueeRow />
      </motion.div>
    </div>
  );
};

export default Marquee;

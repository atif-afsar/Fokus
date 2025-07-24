// src/components/Bottle.js

import React from 'react';
import { motion } from 'framer-motion';

// This variant animates the liquid inside the bottle.
// It uses the `custom` prop to create a staggered delay for each bottle.
const liquidVariants = {
  visible: (i) => ({
    y: ['100%', '20%', '100%'],
    transition: {
      delay: i * 0.3,
      duration: 2.5,
      ease: [0.77, 0, 0.175, 1], // custom cubic-bezier for extra smoothness
      repeat: Infinity,
    },
  }),
};

// A custom SVG path for a modern-looking bottle.
const bottlePath = 'M16 3V10C16 12 14 13 14 16V88H26V16C26 13 24 12 24 10V3H16Z';

const Bottle = ({ index, large }) => {
  return (
    <div className={
      large
        ? "relative w-20 h-44 md:w-28 md:h-64"
        : "relative w-10 h-28 md:w-12 md:h-32"
    }>
      {/* SVG for the liquid fill, which will be clipped */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 90"
        className="absolute inset-0"
      >
        <defs>
          <clipPath id="bottleClip">
            <path d={bottlePath} />
          </clipPath>
        </defs>
        {/* The yellow liquid rectangle */}
        <g clipPath="url(#bottleClip)">
          <motion.rect
            x="0"
            width="40"
            height="90"
            className="fill-yellow-400"
            variants={liquidVariants}
            initial={{ y: '100%' }} // Start hidden at the bottom
            animate="visible"
            custom={index} // Pass the index to the variants for the delay
          />
        </g>
      </svg>

      {/* SVG for the bottle outline, drawn on top */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 90"
        className="absolute inset-0"
      >
        <path
          d={bottlePath}
          className="stroke-yellow-400"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Bottle;
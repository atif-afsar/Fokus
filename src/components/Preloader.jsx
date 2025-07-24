// src/components/Preloader.js

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Bottle from './Bottle'; // Make sure the path is correct

// Variants to animate the container and its children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: 'beforeChildren', // Ensure container is visible before children animate
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

// Variants for the progress bar filling up
const progressBarVariant = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 2.5, // Match the visual loading time
      ease: 'linear',
    },
  },
};

// Variants for the "LOADING" text fade-in
const textVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.2, // A slight delay to appear after animations start
    },
  },
};

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [showReady, setShowReady] = useState(false);

  useEffect(() => {
    let start = Date.now();
    let raf;
    function update() {
      const elapsed = Date.now() - start;
      const percent = Math.min(100, Math.round((elapsed / 2500) * 100));
      setProgress(percent);
      if (percent < 100) {
        raf = requestAnimationFrame(update);
      } else {
        setTimeout(() => setShowReady(true), 400); // slight delay for effect
      }
    }
    update();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Container for the four bottles */}
      <div className="flex items-end space-x-8 md:space-x-14">
        {[0, 1, 2, 3].map((i) => (
          <Bottle key={i} index={i} large />
        ))}
      </div>

      {/* Progress Bar and Percentage */}
      <div className="w-56 md:w-64 h-1 mt-8 bg-gray-800 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-yellow-400 origin-left"
          variants={progressBarVariant}
          initial="hidden"
          animate="visible"
        />
        <span className="absolute right-0 -top-8 text-yellow-400 font-mono text-lg select-none">
          {progress}%
        </span>
      </div>

      {/* Loading Text */}
      <motion.h1
        className="mt-4 text-xl md:text-2xl font-mono text-yellow-400 tracking-[0.3em]"
        variants={textVariant}
      >
        LOADING
      </motion.h1>

      {/* Animated 'Ready For The Fokus' Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={showReady ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-8 text-2xl md:text-4xl font-bold text-yellow-400 tracking-wide font-sans"
        style={{ letterSpacing: '0.08em' }}
      >
        {showReady && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
           READY FOR THE FOKUS
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
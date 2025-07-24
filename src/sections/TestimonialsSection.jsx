import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: "Ashish Chanchlani",
    review: "Fokus has completely changed my afternoons. No more jitters, just pure, clean energy. The Strawberry Watermelon is my favorite!",
    imgSrc: "https://fokus.shop/cdn/shop/files/ashishchanchlani.jpg?v=1738667110&width=1920",
  },
  {
    name: "Tanmay 'Scout'",
    review: "As a developer, staying sharp is key. Fokus gives me the mental clarity I need to power through complex projects without the crash.",
    imgSrc: "https://fokus.shop/cdn/shop/files/Scout.jpg?v=1738666810&width=1920",
  },
  {
    name: "Purav Jha",
    review: "I love that it's sugar-free and packed with actual health benefits. It's my go-to drink before a workout or a long study session.",
    imgSrc: "https://fokus.shop/cdn/shop/files/purav_jha.jpg?v=1738666979&width=1920",
  },
  {
    name: "Aditya Rikhari",
    review: "The taste is amazing, and the electrolyte balance is perfect for recovery. It's so much better than generic sports drinks.",
    imgSrc: "https://fokus.shop/cdn/shop/files/adityarikhari.jpg?v=1738667057&width=1920",
  },
];

const TestimonialsSection = () => {
  const [activeReview, setActiveReview] = useState(testimonials[0]);

  return (
    <section className="w-full min-h-screen bg-[#86C741] py-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Glowing background blur */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* 3D Hover Effect on Heading */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-black text-center mb-16 z-10 cursor-pointer"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        whileHover={{
          scale: 1.05,
          textShadow: '0px 10px 20px rgba(0,0,0,0.25)',
          rotateX: 8,
          rotateY: -8,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
      >
        WHAT YOUR FAVOURITES SAY
      </motion.h2>

      {/* Image Cards */}
      <div className="flex flex-wrap gap-6 justify-center items-center max-w-6xl mb-16 z-10">
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.name}
            onMouseEnter={() => setActiveReview(testimonial)}
            whileHover={{ scale: 1.08 }}
            className={`cursor-pointer transition-all duration-300 w-[220px] md:w-[250px]  backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border-2 ${
              activeReview.name === testimonial.name ? 'border-black' : 'border-transparent'
            }`}
          >
            <img
              src={testimonial.imgSrc}
              alt={testimonial.name}
              className="w-full h-64 object-cover transition-all duration-300 grayscale hover:grayscale-0"
            />
            <div className="p-4 text-black text-center font-semibold">{testimonial.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Animated Review */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeReview.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl bg-white/30 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl relative z-10"
        >
          <p className="text-xl md:text-2xl italic text-gray-800 mb-4 text-center leading-relaxed">
            “{activeReview.review}”
          </p>
          <p className="text-lg font-bold text-black text-center">– {activeReview.name}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;

import React, { useRef } from "react";
import {
  useMotionValue,
  useTransform,
  useMotionTemplate,
  motion
} from "framer-motion";

// The URL for the high-quality trio image
const TRIO_IMAGE_URL =
  "https://cdn.shopify.com/s/files/1/0619/0569/8889/files/focusprd__1_-removebg-preview.png?v=1738065445";

/**
 * InteractiveImage Component
 * This component displays an image that creates a 3D "bending" or "tilting"
 * effect in response to the user's mouse movement over it.
 */
function InteractiveImage() {
  const containerRef = useRef(null);

  // Using Motion Values to track and react to mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHover = useMotionValue(0);

  // Calculate rotation degrees based on mouse position and hover state
  const rotateX = useTransform(y, (v) => (isHover.get() ? v * -20 : 0));
  const rotateY = useTransform(x, (v) => (isHover.get() ? v * 20 : 0));
  // Compose a full transform string for framer-motion
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    // Normalize mouse position to a range of -1 to 1 relative to the container
    x.set(((event.clientX - left) / width - 0.5) * 2);
    y.set(((event.clientY - top) / height - 0.5) * 2);
  };

  const handleMouseEnter = () => {
    isHover.set(1);
  };

  const handleMouseLeave = () => {
    // Reset the motion values when the mouse leaves
    x.set(0);
    y.set(0);
    isHover.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
      className="aspect-[4/5]"
    >
      <motion.img
        style={{
          transform,
          transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
        src={TRIO_IMAGE_URL}
        alt="Fokus beverage trio"
        className="w-full max-w-lg object-contain drop-shadow-2xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/600x600/a3e635/000000?text=Image+Not+Found";
        }}
        draggable={false}
        loading="lazy"
      />
    </motion.div>
  );
}

/**
 * The main Story Section component, now featuring the interactive image.
 */
const StorySection = () => {
  // Animation variants for the text and image containers
  const textContainerVariant = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const imageContainerVariant = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="StorySection" className="relative w-full min-h-screen flex items-center justify-center py-12 px-2 sm:px-4 md:px-12 bg-[#a3e635] overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center max-w-7xl w-full mx-auto gap-8 md:gap-16">
        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={textContainerVariant}
        >
          <motion.div
            variants={itemVariant}
            className="font-extrabold tracking-tighter uppercase leading-none text-center md:text-left space-y-4"
          >
            {/* First Line */}
            <motion.h2
              whileHover={{
                scale: 1.1,
                rotateX: 10,
                rotateY: -10,
                textShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-black text-[#fde047] px-2 sm:px-4 py-2 inline-block text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
            >
              KNOW FOKUS,
            </motion.h2>

            {/* Second Line */}
            <motion.h2
              whileHover={{
                scale: 1.1,
                rotateX: 10,
                rotateY: 10,
                textShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-[#fde047] text-black px-2 sm:px-4 py-2 inline-block mt-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
            >
              KNOW US
            </motion.h2>
          </motion.div>

          <motion.p
            variants={itemVariant}
            className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl text-black font-bold max-w-xs sm:max-w-lg leading-relaxed"
          >
            Fokus isn’t just a drink—it’s a lifestyle you live every day. Dive
            into our story and see what makes us different.
          </motion.p>
        </motion.div>

        {/* Right Column: Interactive Image */}
        <motion.div
          className="w-full h-[40vh] sm:h-[60vh] md:h-[70vh] min-h-[260px] md:min-h-[450px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={imageContainerVariant}
        >
          <InteractiveImage />
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection;

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import Marquee from "./Marquee";

// --- Reusable Components (No changes here) ---

const UserIcon = () => (
  <svg
    className="w-6 h-6 text-black cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    className="w-6 h-6 text-black cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z"
    />
  </svg>
);

// --- Floating Bubble Component & Hook (No changes here) ---
const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

const FloatingBubble = React.memo(({ x, y, delay = 0 }) => {
  const bubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: x,
      y: y,
    },
    visible: {
      opacity: [0, 0.6, 0.4, 0],
      scale: [0, 1, 1.2, 0.8],
      y: y - 100,
      x: x + (Math.random() - 0.5) * 30,
      transition: {
        duration: 2,
        delay,
        ease: "easeOut",
      },
    },
  };

  const bubbleSize = Math.random() * 20 + 10;
  const bubbleStyle = {
    background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))`,
    borderRadius: "50%",
    width: `${bubbleSize}px`,
    height: `${bubbleSize}px`,
    position: "absolute",
    pointerEvents: "none",
    zIndex: 1000,
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(2px)",
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      style={bubbleStyle}
    />
  );
});

const useFloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const bubbleIdRef = useRef(0);
  const intervalRef = useRef(null);

  // Only enable on desktop
  if (isMobile()) return { bubbles: [], handleMouseEnter: () => {}, handleMouseLeave: () => {} };

  const addBubble = (rect) => {
    setBubbles((prev) => {
      if (prev.length >= 10) return prev; // Limit max bubbles
    const x = Math.random() * rect.width;
    const y = rect.height - 20;
    const newBubble = { id: bubbleIdRef.current++, x, y, delay: Math.random() * 0.2 };
    setTimeout(() => {
        setBubbles((prev2) => prev2.filter((bubble) => bubble.id !== newBubble.id));
    }, 2500);
      return [...prev, newBubble];
    });
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    intervalRef.current = setInterval(() => addBubble({ width: rect.width, height: rect.height }), 400);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeout(() => setBubbles([]), 100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { bubbles, handleMouseEnter, handleMouseLeave };
};

// Particle background component
const ParticleBackground = React.memo(({ sectionRef }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particles = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // Lower particle count for performance
  const PARTICLE_COUNT = isMobile() ? 15 : 30;

  useEffect(() => {
    function updateSize() {
      if (sectionRef.current) {
        setDimensions({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight,
        });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [sectionRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions.width || !dimensions.height) return;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = dimensions.width;
    let height = canvas.height = dimensions.height;

    // Generate particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1.2,
      dx: (Math.random() - 0.5) * 5.5,
      dy: (Math.random() - 0.5) * 5.5,
      baseAlpha: Math.random() * 0.5 + 0.5,
      alphaPhase: Math.random() * Math.PI * 2,
      baseR: Math.random() * 2.5 + 1.2,
      rPhase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let lastTime = 0;
    function draw(now) {
      if (now - lastTime < 33) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTime = now;
      ctx.clearRect(0, 0, width, height);
      frame++;
      for (let p of particles.current) {
        p.alpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(frame * 0.03 + p.alphaPhase));
        p.r = p.baseR * (0.85 + 0.15 * Math.sin(frame * 0.04 + p.rPhase));
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fffde7';
        ctx.shadowColor = '#fffde7';
        ctx.shadowBlur = 0; // Remove shadow blur for performance
        ctx.fill();
        ctx.restore();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions, sectionRef, PARTICLE_COUNT]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
});

/**
 * The main Hero Section component, with an updated sticky header and image effects.
 */
const HeroSection = React.memo(() => {
  const bubbleEffect1 = useFloatingBubbles();
  const bubbleEffect2 = useFloatingBubbles();
  const sectionRef = useRef(null);

  const sentence = React.useMemo(() => ({
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  }), []);

  const wordAnimation = React.useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }), []);

  const imageFrame = React.useMemo(() => ({
    hidden: (isLeft) => ({
      opacity: 0,
      x: isLeft ? -100 : 100,
      scale: 0.8,
      rotate: isLeft ? -10 : 10,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  }), []);

  return (
    // You might need a parent div with a defined height if you have more content below this section
    <section
      ref={sectionRef}
      id="HeroSection"
      className="relative w-full h-screen md:h-screen overflow-hidden flex flex-col bg-yellow-300"
    >
      {/* Particle background */}
      <ParticleBackground sectionRef={sectionRef} />

       {/* <div className="absolute inset-0 z-0"> */}
        {/* First row of bottles scrolling left */}
        {/* <div className="absolute top-1/4"> */}
          {/* <Marquee speed={30} direction="left" /> */}
        {/* </div> */}

        {/* Second row, slightly offset, scrolling right */}
        {/* <div className="absolute top-1/2"> */}
          {/* <Marquee speed={25} direction="right" /> */}
        {/* </div> */}
      {/* </div> */}


      {/* Main Content Area */}
      <main className="relative flex-1 grid grid-cols-1 md:grid-cols-3 items-center justify-items-center z-10 w-full max-w-screen-2xl mx-auto px-2 md:px-4 gap-4 md:gap-4">
        {/* Left Column: Influencer 1 Image */}
        <motion.div
          custom={true} // isLeft = true
          variants={imageFrame}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          className="w-full h-[28vh] sm:h-[32vh] md:h-[70vh] max-h-[700px] bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-2 md:p-4 cursor-pointer transition-shadow duration-300"
        >
          <img
            src="https://fokus.shop/cdn/shop/files/mdl1.png?v=1737522791"
            alt="Influencer with Fokus drink"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x800/eab308/000000?text=Fokus";
            }}
            loading="lazy"
          />
        </motion.div>

        {/* Center Column: Animated Tagline */}
        <div className="text-center relative px-2 md:px-0">
          <motion.div
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-none space-y-2 relative overflow-hidden"
            onMouseEnter={bubbleEffect1.handleMouseEnter}
            onMouseLeave={bubbleEffect1.handleMouseLeave}
          >
            {"STAY HYDRATED".split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordAnimation}
                whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                className="block cursor-pointer relative z-10"
              >
                {word}
              </motion.span>
            ))}
            <AnimatePresence>
              {bubbleEffect1.bubbles.map((bubble) => (
                <FloatingBubble key={bubble.id} x={bubble.x} y={bubble.y} delay={bubble.delay} />
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase leading-none text-black bg-white inline-block px-2 md:px-4 mt-2 md:mt-4 relative overflow-hidden"
            onMouseEnter={bubbleEffect2.handleMouseEnter}
            onMouseLeave={bubbleEffect2.handleMouseLeave}
          >
            {"LETS FOKUS".split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordAnimation}
                whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                className="inline-block cursor-pointer relative z-10"
              >
                {word}&nbsp;
              </motion.span>
            ))}
            <AnimatePresence>
              {bubbleEffect2.bubbles.map((bubble) => (
                <FloatingBubble key={bubble.id} x={bubble.x} y={bubble.y} delay={bubble.delay} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column: Influencer 2 Image */}
        <motion.div
          custom={false} // isLeft = false
          variants={imageFrame}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform" }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          className="w-full h-[28vh] sm:h-[32vh] md:h-[70vh] max-h-[700px] bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-2 md:p-4 cursor-pointer transition-shadow duration-300"
        >
          <img
            src="https://fokus.shop/cdn/shop/files/mdl2.png?v=1737522792"
            alt="Influencer with Fokus drink"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x800/eab308/000000?text=Fokus";
            }}
            loading="lazy"
          />
        </motion.div>
      </main>
    </section>
  );
});

export default HeroSection;
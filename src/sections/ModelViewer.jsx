import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import TrailCursor from './TrailCursor';
import { motion } from 'framer-motion';

// --- Data ---
const comparisonData = [
  { title: "Fokus", features: [ { name: "Caffeine Content", value: "None" }, { name: "Added Sugars", value: "None" }, { name: "Health Benefits", value: "Vitamin D3, LCLT, Ginkgo Biloba, Glutamine, 5-HTP" }, { name: "Electrolyte Balance", value: "Provided by Coconut Water and Salt" }, ], },
  { title: "Generic Energy Drink", features: [ { name: "Caffeine Content", value: "High (80-300mg)" }, { name: "Added Sugars", value: "Yes (HFCS, Glucose)" }, { name: "Health Benefits", value: "Quick energy boost" }, { name: "Electrolyte Balance", value: "May lack sufficient electrolytes" }, ], },
  { title: "Generic Sports Drink", features: [ { name: "Caffeine Content", value: "Low to Moderate" }, { name: "Added Sugars", value: "Yes (Glucose, Fructose)" }, { name: "Health Benefits", value: "Minimal nutritional benefits" }, { name: "Electrolyte Balance", value: "Focus on providing electrolytes" }, ], },
];

// --- 3D Model Component (Unchanged) ---
const Model = React.memo(({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  // Throttle rotation to ~30fps
  const lastFrame = useRef(Date.now());
  useFrame(() => {
    const now = Date.now();
    if (modelRef.current && now - lastFrame.current > 33) {
      modelRef.current.rotation.y += 0.03;
      lastFrame.current = now;
    }
  });
  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={3.3}
      position={[0, -0.0, 0]} 
    />
  );
});

// --- Animated Heading Component (Unchanged) ---
const AnimatedHeading = ({ text }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30, skewY: 5 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 },
    },
  };

  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        textShadow: [
          '0px 2px 3px rgba(0,0,0,0.1)',
          '0px 4px 7px rgba(0,0,0,0.09)',
          '0px 8px 15px rgba(0,0,0,0.08)',
          '0px 16px 30px rgba(0,0,0,0.07)'
        ].join(','),
        transition: { type: 'spring', stiffness: 200, damping: 10 }
      }}
      className="text-center text-5xl md:text-7xl font-extrabold text-black mb-16 cursor-pointer"
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block mr-4">
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

// --- Info Block (Updated with Hover Effect) ---
const InfoBlock = ({ title, features }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.07,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-full max-w-xs text-left">
      <motion.h3
        className="text-4xl font-bold mb-4 text-black cursor-pointer"
        whileHover={{
          scale: 1.05,
          textShadow: '0px 2px 5px rgba(0,0,0,0.2)',
          transition: { type: 'spring', stiffness: 300 }
        }}
      >
        {title}
      </motion.h3>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {features.map((feature, i) => (
          <motion.div key={i} variants={itemVariants}>
            <p className="font-semibold text-xl text-black">{feature.name}</p>
            <p className="text-lg text-gray-800">{feature.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main Section Component (Unchanged) ---
const WhyFokusInteractive = React.memo(() => {
  const [fokus, genericEnergy, genericSports] = comparisonData;
  const modelPath = "/assets/Kiwi_Lemon_Drink_0720105538_texture.glb"; // Consider compressing/optimizing this .glb asset for better performance

  return (
    <section id="ModelViewer" className="relative w-full min-h-screen bg-[#79b43a] py-10 px-2 md:py-20 md:px-4 overflow-hidden">
      <TrailCursor/>
      <div className="relative z-10">
        <AnimatedHeading text="WHY FOKUS" />
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16">
          <div className="w-full lg:w-1/4 flex justify-end mb-6 lg:mb-0">
            <InfoBlock {...fokus} />
          </div>
          <div className="w-full lg:w-1/2 max-w-full lg:max-w-md h-[32vh] min-h-[160px] md:h-[600px]">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <Environment preset="city" />
                <Model modelPath={modelPath} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
              </Suspense>
            </Canvas>
          </div>
          <div className="w-full lg:w-1/4 flex flex-col items-start gap-6 lg:gap-10 mt-6 lg:mt-0">
            <InfoBlock {...genericEnergy} />
            <InfoBlock {...genericSports} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default WhyFokusInteractive;

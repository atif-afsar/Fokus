import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
// --- OPTIMIZATION: Import LazyMotion and domAnimation ---
// This reduces the bundle size of framer-motion by only loading the features we need.
import { LazyMotion, domAnimation, motion } from 'framer-motion';

// --- IMPORTANT PERFORMANCE NOTE ---
// The single most important optimization for this component is the 3D model itself.
// Ensure your '.glb' file has a low polygon count (ideally < 50,000) and that
// its textures are compressed and reasonably sized (e.g., 1024x1024).
// No amount of code optimization can fix a model that is too complex for web use.

const TRIO_MODEL_PATH = '/assets/Fokus_Mango_Pineapple_0720105025_texture.glb';

// --- Simplified and Optimized Icon Components ---
// Added will-change to hint to the browser about upcoming transform animations.
const IconWrapper = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.15, y: -5 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    style={{ willChange: 'transform' }}
    className="w-20 h-18 sm:w-20 sm:h-20 md:w-48 md:h-48 lg:w-60 lg:h-60 cursor-pointer"
  >
    {children}
  </motion.div>
);

const IconImage = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt} 
    className="w-full h-full object-contain filter drop-shadow-lg"
    loading="lazy" // Optimization: Defer loading of offscreen images
  />
);

/**
 * Renders the 3D trio model with a continuous rotation.
 */
function RotatingTrioModel() {
  const group = useRef();
  const { scene } = useGLTF(TRIO_MODEL_PATH);
  const memoizedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (group.current) {
      // Use delta time for frame-rate independent rotation
      group.current.rotation.y += 0.5 * delta;
    }
  });

  return <primitive ref={group} object={memoizedScene} scale={2.0} position={[0, -0.2, 0]} />;
}

/**
 * A reusable component for displaying a feature icon.
 */
const FeatureItem = ({ icon, isLeft = true }) => {
  const itemVariant = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={itemVariant}
      className="flex items-center justify-center"
    >
      {icon}
    </motion.div>
  );
};

/**
 * The main Performance Section component.
 */
const PerformanceSection = () => {
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    // --- OPTIMIZATION: Wrap component in LazyMotion ---
    <LazyMotion features={domAnimation}>
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-10 px-2 md:px-12" style={{ background: '#FFE060' }}>
        
        <div className="text-center mb-8 md:mb-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {["Stay Active,", "Stay Hydrated,", "Stay Fokus"].map((text, index) => (
              <motion.h2
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.8, ease: "easeOut" }
                  }
                }}
                // --- OPTIMIZATION: Drastically simplified hover animation ---
                // Removed expensive 'textShadow' and 'filter' animations.
                whileHover={{ scale: 1.05 }}
                className="text-4xl md:text-4xl lg:text-6xl font-black text-black cursor-pointer inline-block mr-4 mb-2"
                style={{ willChange: 'transform' }} // Optimization
              >
                {text}
              </motion.h2>
            ))}
          </motion.div>
        </div>

        {/* Responsive icon/model row: flex-row on mobile, grid-cols-3 on md+ */}
        <div className="flex flex-row items-center justify-center md:grid md:grid-cols-3 w-full max-w-7xl mx-auto flex-1 gap-2 md:gap-0">
          <motion.div
            className="flex flex-col items-center gap-4 sm:gap-10 md:gap-16 order-1 md:order-none w-1/4 md:w-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariant}
          >
            <FeatureItem icon={<IconWrapper><IconImage src="https://fokus.shop/cdn/shop/files/icon1.png?v=1737367832" alt="Coconut Water Icon" /></IconWrapper>} isLeft={true} />
            <FeatureItem icon={<IconWrapper><IconImage src="https://fokus.shop/cdn/shop/files/icon3.png?v=1737367832" alt="No Sugar Icon" /></IconWrapper>} isLeft={true} />
          </motion.div>
          {/* 3D Model Center */}
          <div className="order-2 md:order-none w-2/4 md:w-auto h-[40vh] min-h-[180px] md:h-[80vh] md:min-h-[400px] flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 1.5]}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Suspense fallback={null}>
                <RotatingTrioModel />
              </Suspense>
            </Canvas>
          </div>
          <motion.div
            className="flex flex-col items-center gap-4 sm:gap-10 md:gap-16 order-3 md:order-none w-1/4 md:w-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariant}
          >
            <FeatureItem icon={<IconWrapper><IconImage src="https://fokus.shop/cdn/shop/files/icon2.png?v=1737367832" alt="Fight Off Fatigue Icon" /></IconWrapper>} isLeft={false} />
            <FeatureItem icon={<IconWrapper><IconImage src="https://fokus.shop/cdn/shop/files/increase_energy_icon_1.png?v=1738220359" alt="Energy Boost Icon" /></IconWrapper>} isLeft={false} />
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default PerformanceSection;

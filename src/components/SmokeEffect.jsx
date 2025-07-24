import React from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// You can replace this with any public/free smoke PNG
const SMOKE_TEXTURE_URL = 'https://raw.githubusercontent.com/emmelleppi/react-three-fiber-smoke/main/public/smoke.png';

const variants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: { scale: 1.2, opacity: 0.7, transition: { duration: 1, ease: 'easeOut' } },
};

const SmokeEffect = ({ visible = false, position = [0, 0, 0], ...props }) => {
  const texture = useLoader(TextureLoader, SMOKE_TEXTURE_URL);

  return (
    <motion.mesh
      position={position}
      variants={variants}
      animate={visible ? 'visible' : 'hidden'}
      {...props}
    >
      <planeGeometry args={[1.8, 1.8]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </motion.mesh>
  );
};

export default SmokeEffect; 
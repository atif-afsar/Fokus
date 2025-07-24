import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

let lenisInstance = null; // Prevent multiple instances

const SmoothScroll = () => {
  const rafId = useRef(null);

  useEffect(() => {
    if (lenisInstance) {
      console.warn('Lenis instance already exists. Preventing duplicate initialization.');
      return;
    }
    try {
      lenisInstance = new Lenis({
        lerp: 0.07, // try values between 0.05 and 0.15 for best results
        smooth: true,
      });

      function raf(time) {
        lenisInstance.raf(time);
        rafId.current = requestAnimationFrame(raf);
      }
      rafId.current = requestAnimationFrame(raf);

    } catch (err) {
      console.error('Failed to initialize Lenis:', err);
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    }
  }, [])

  return null;
};

export default SmoothScroll;

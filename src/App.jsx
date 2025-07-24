import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import your components
import Preloader from './components/Preloader'; // The new preloader component
import Header from './components/Header';
import LoginModal from './components/LoginModal';

// Import your actual, styled sections from their files
import HeroSection from './sections/HeroSection';
import StorySection from './sections/StorySection';
import PerformanceSection from './sections/PerformanceSection';
import Marquee from './sections/Marquee';
import Marquee2 from './sections/Marquee2';
import ProfilesMarquee from './sections/ProfilesMarquee';
import ModelViewer from './sections/ModelViewer';
import Marquee3 from './sections/Marquee3';
import TestimonialsSection from './sections/TestimonialsSection';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';

const App = () => {
  // State to manage the loading screen's visibility
  const [isLoading, setIsLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);

  // This effect runs once when the app loads to simulate loading time
  useEffect(() => {
    // Hide the scrollbar while the preloader is visible
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Restore the scrollbar after the preloader is gone
      document.body.style.overflow = 'auto';
    }, 4000); // Preloader will be visible for 4 seconds

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* This component handles the smooth exit animation of the preloader */}
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {/* The main content is now rendered conditionally */}
      {!isLoading && (
        <div className="w-full min-h-screen bg-white">
          <Header onLoginClick={() => setLoginOpen(true)} />
         
          <main> 
            <SmoothScroll/>
            <HeroSection />
             <Marquee/>
            <StorySection />
            <Marquee2 />
            <PerformanceSection />
            <ProfilesMarquee />
            <ModelViewer />
            <Marquee3 />
            <TestimonialsSection />
            <Footer/>
          </main>
          <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
        </div>
      )}
    </>
  );
};

export default App;
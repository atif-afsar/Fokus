// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path is correct

// --- SVG Icon Components (can be moved to a separate file if preferred) ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 sm:h-8 sm:w-8 text-black" // Responsive sizing
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 sm:h-8 sm:w-8 text-black" // Responsive sizing
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const Header = ({ onLoginClick }) => {
  const { isAuthenticated, user, logout, loading: authLoading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown area to detect clicks outside

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // Depend on dropdownRef

  const handleUserIconClick = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown state
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-white/70 backdrop-blur-md shadow-md">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex flex-wrap justify-between items-center"
      >
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-lg font-semibold text-black tracking-wide">
          {[
            { name: "Home", href: "#HeroSection" },
            { name: "Know Fokus", href: "#StorySection" },
            { name: "Product", href: "#ModelViewer" },
          ].map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="relative group transition-all duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Center Logo */}
        <motion.div
          className="font-extrabold text-2xl sm:text-4xl md:text-5xl text-black md:absolute md:left-1/2 md:-translate-x-1/2 select-none tracking-widest"
          whileHover={{
            scale: 1.1,
            rotate: 2,
            textShadow: "0px 0px 12px rgba(0,0,0,0.3)",
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
        >
          FOKUS
        </motion.div>

        {/* Right Section: Icons and Auth */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Cart Icon */}
          <motion.button
            className="p-1 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            aria-label="View cart"
            // onClick={() => alert('Cart functionality coming soon!')}
          >
            <CartIcon />
          </motion.button>

          {/* Authentication Section */}
          {authLoading ? (
            <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : isAuthenticated ? (
            // If user is logged in, show User Icon with Dropdown
            <div className="relative" ref={dropdownRef}> {/* Attach ref here */}
              <motion.button
                className="flex items-center justify-center p-1 rounded-full"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                aria-label="User menu"
                onClick={handleUserIconClick} // Handle click to toggle dropdown
              >
                <UserIcon />
              </motion.button>
              {/* Dropdown Menu - Conditionally rendered with classes for animation */}
              <div
                className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 transition-all duration-200 z-10
                  ${isDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
              >
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                  Signed in as
                  <br />
                  <span className="font-bold text-black truncate block">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout} // Call handleLogout
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 transition-colors"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // If user is logged out, show Login Button
            <button
              onClick={onLoginClick}
              className="ml-1 md:ml-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow transition-colors text-sm md:text-base whitespace-nowrap"
              aria-label="Open login modal"
            >
              Login
            </button>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
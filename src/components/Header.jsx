// src/components/Header.js

import React from "react";
import { motion } from 'framer-motion';

// SVG Icon components are now defined with actual SVG code
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-6 text-black cursor-pointer"
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
    className="h-8 w-6 text-black cursor-pointer"
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
  return (
    <header className="sticky top-0 z-50 w-full  px-6 sm:px-8 py-4 bg-white/70 backdrop-blur-md shadow-md">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex justify-between items-center"
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
          className="font-extrabold text-4xl md:text-5xl text-black md:absolute md:left-1/2 md:-translate-x-1/2 select-none tracking-widest"
          whileHover={{
            scale: 1.1,
            rotate: 2,
            textShadow: "0px 0px 12px rgba(0,0,0,0.3)",
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
        >
          FOKUS
        </motion.div>

        {/* Icons and Login Button */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <UserIcon />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CartIcon />
          </motion.div>
          <button
            onClick={onLoginClick}
            className="ml-2 px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow transition-colors text-base"
          >
            Login
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;

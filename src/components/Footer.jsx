import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, Mail } from 'lucide-react';

// --- Data for Footer Links (Easy to update) ---
const navLinks = {
  columnOne: [
    { name: 'Shop', href: '#' },
    { name: 'Orders', href: '#' },
    { name: 'Return Policy', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Shipping Policy', href: '#' },
  ],
  columnTwo: [
    { name: 'Know Fokus', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Customer Service', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Email', icon: Mail, href: '#' },
];


// --- Animation Variants ---
const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80 },
  },
};

const hoverEffect = {
  scale: 1.1,
  color: '#94DA49',
  transition: { type: 'spring', stiffness: 300 },
};


// --- Main Footer Component ---
const Footer = () => {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-[#FFF5BD] text-black w-full py-6 px-4 sm:px-6 lg:px-8 font-sans" // Height reduced by changing py-12 to py-6
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* Left Section: Logo and Copyright */}
        <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Added 3D pop-up hover effect to FOKUS logo */}
            <motion.h2
              className="text-4xl font-extrabold tracking-tighter cursor-pointer"
              whileHover={{
                scale: 1.05,
                textShadow: '0px 2px 4px rgba(0,0,0,0.15), 0px 5px 10px rgba(0,0,0,0.1)',
                transition: { type: 'spring', stiffness: 300 }
              }}
            >
              FOKUS
            </motion.h2>
          </div>
          <p className="text-gray-500 mt-8 md:mt-0 text-sm">
            © 2025, Fokus Beverages Private Limited.
          </p>
        </motion.div>

        {/* Center Section: Navigation Links */}
        <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-3 grid grid-cols-2 gap-8">
          {/* Column One */}
          <div>
            <ul className="space-y-3">
              {navLinks.columnOne.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-800 hover:text-[#94DA49] transition-colors duration-300 text-base"
                    whileHover={{ x: 4, scale: 1.05 }} // Added scale on hover
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          {/* Column Two */}
          <div>
            <ul className="space-y-3">
              {navLinks.columnTwo.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-800 hover:text-[#94DA49] transition-colors duration-300 text-base"
                    whileHover={{ x: 4, scale: 1.05 }} // Added scale on hover
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Section: Socials and Privacy */}
        <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-4 flex flex-col items-start md:items-end justify-between">
          {/* Social Icons */}
          <div className="flex space-x-5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                whileHover={hoverEffect}
                className="text-gray-600"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
          {/* Privacy Policy */}
          <div className="mt-8 md:mt-0">
             <motion.a
                href="#"
                className="text-gray-800 hover:text-[#94DA49] transition-colors duration-300 text-base"
                whileHover={{ x: 4, scale: 1.05 }} // Added scale on hover
              >
                Privacy policy
              </motion.a>
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
};

export default Footer;

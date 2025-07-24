import React from 'react';
import { motion } from 'framer-motion';

const profiles = [
  { name: "Nischay Malhan", imgSrc: "https://fokus.shop/cdn/shop/files/N01.jpg?v=1736340980&width=1920" },
  { name: "Abhishek Malhan", imgSrc: "https://fokus.shop/cdn/shop/files/5.jpg?v=1736324313&width=1920" },
  { name: "Abhishek Malhan", imgSrc: "https://fokus.shop/cdn/shop/files/4_9fd7d940-dccc-405c-9514-33e23831ce6e.jpg?v=1736324277&width=1920" },
  { name: "Nischay & Abhishek", imgSrc: "https://fokus.shop/cdn/shop/files/NA01.jpg?v=1736341032&width=1920" },
  { name: "Mayank Mishra", imgSrc: "https://fokus.shop/cdn/shop/files/8.jpg?v=1736324529&width=1920" },
  { name: "Nischay Malhan", imgSrc: "https://fokus.shop/cdn/shop/files/N02.jpg?v=1736341080&width=1920" },
  { name: "Abhishek Malhan", imgSrc: "https://fokus.shop/cdn/shop/files/1.jpg?v=1736324075&width=1920" },
  { name: "Nischay Malhan", imgSrc: "https://fokus.shop/cdn/shop/files/2_61ac9460-ed09-4e08-a577-e03b367d51d6.jpg?v=1736324206&width=1920" },
];

const ProfileCard = ({ imgSrc, name }) => (
  <motion.div
    className="group relative h-[400px] w-[280px] flex-shrink-0 overflow-hidden rounded-3xl bg-[#FFF5BD]"
    whileHover={{
      scale: 1.05,
      zIndex: 10,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    }}
  >
    <img
      src={imgSrc}
      alt={name}
      className="h-full w-full object-cover"
      loading="lazy"
    />

    {/* Subtle gradient on bottom */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

    {/* White name text ONLY on hover */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-white text-xl font-semibold">{name}</h3>
    </div>
  </motion.div>
);


const Marquee = ({ profiles, speed = 30 }) => {
  const repeatedProfiles = [...profiles, ...profiles];

  return (
    <motion.div
      className="flex w-max whitespace-nowrap"
      animate={{
        x: ['0%', '-50%'],
      }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      }}
    >
      {repeatedProfiles.map((p, i) => (
        <div key={i} className="mx-4">
          <ProfileCard {...p} />
        </div>
      ))}
    </motion.div>
  );
};

const ProfilesMarquee = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFF5BD] py-12">
      <Marquee profiles={profiles} speed={30} />
    </section>
  );
};

export default ProfilesMarquee;

// src/components/FloatingTag.jsx
import React from 'react';
import { motion } from "framer-motion"; // Import motion for animation
import { useTranslation } from 'react-i18next'; // Import the hook

// Component for a single floating tag with animation
const FloatingTag = ({ tag, delay }) => {
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  return (
    // motion.div for Framer Motion animation
    <motion.div
      initial={{ y: 0 }} // Start at vertical position 0
      animate={{ y: [0, 10, -10, 0] }} // Animate vertical position up and down
      transition={{
        repeat: Infinity, // Repeat the animation forever
        duration: 4, // Duration of one animation cycle
        ease: "easeInOut", // Easing function for smooth animation
        delay, // Stagger the animation start based on the delay prop
      }}
      whileHover={{ scale: 1.1 }} // Scale up slightly on hover
      // Styling classes for the tag appearance (padding, text, font, rounded, shadow, gradient)
      className={`px-6 py-3 text-[#213547] text-md font-semibold rounded-full shadow-md bg-gradient-to-r ${tag.gradient}`}
    >
      {/* Use t() to translate the tag label */}
      {t(tag.label)} {/* Display the translated tag text/emoji */}
    </motion.div>
  );
};

export default FloatingTag;

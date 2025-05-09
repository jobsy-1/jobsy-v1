// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Header component with logo, language switcher, nav links, and CTA
function Header() {
  return (
    // Outer header: Sticky, centered, full width container for the rounded bar
    // Uses sticky positioning to stay at the top when scrolling
    <header className="sticky top-0 w-full z-10 flex justify-center">
      {/* Inner container: The actual rounded yellow bar with padding and margin */}
      {/* Flex layout to arrange logo, nav/flags/cta */}
      <div className="bg-[#FDFD96] rounded-full mx-2 my-2 px-3 py-1 flex justify-between items-center w-auto sm:w-auto">

        {/* Logo - Links to the home page */}
        {/* Using Link for internal navigation */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-[#60a09b] flex-shrink-0">
          <span>Jobsy</span>
        </Link>

        {/* Navigation Links, CTA, and Language Switcher - Grouped in a flex container */}
        {/* Allows wrapping on smaller screens, adjusts spacing responsively */}
        <div className="flex items-center flex-wrap justify-end space-x-2 sm:space-x-4 md:space-x-6">

           {/* Navigation Links - Using <a> for internal page anchors */}
           {/* You can change these to <Link to="/some-route"> if they become separate pages */}
            <nav className="flex items-center space-x-2 sm:space-x-4 mx-2 sm:mx-5 flex-shrink-0">
              <a href="#about-us" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base">About</a>
              <a href="#contact" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base">Contact</a>
              {/* Added links for Why Jobsy and Work sections */}
              <a href="#why-jobsy" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base hidden sm:inline">Why Jobsy?</a> {/* Hide on small screens */}
              <a href="#work-fun" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base hidden sm:inline">Work Fun</a> {/* Hide on small screens */}
            </nav>

             {/* Language Switcher (Flags in a circle) - Flex container for flags */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Individual flag containers - Placeholder images and titles */}
              {/* TODO: Implement actual language switching logic */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer">
                <img src="/flags/ar.png" alt="Arabic Flag" className="w-full h-full object-cover" title="Arabic"/>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer">
                <img src="/flags/ku.png" alt="Kurdish Flag" className="w-full h-full object-cover" title="Kurdish"/>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer">
                <img src="/flags/en.png" alt="English Flag" className="w-full h-full object-cover" title="English"/>
              </div>
            </div>

            {/* Sign Up CTA Button - Links to the signup route */}
            {/* Using Link for internal navigation */}
            <Link
              to="/signup"
              className="bg-[#60a09b] text-white py-1 px-3 sm:py-2 sm:px-6 rounded-full text-sm sm:text-lg font-semibold hover:bg-[#8e82b4] transition-colors flex-shrink-0"
            >
              Get Started
            </Link>
          </div>

        </div>
    </header>
  );
}

export default Header;

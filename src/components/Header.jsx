import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
 return (
    <header className="bg-[#fefef2] fixed top-0 left-0 py-2 w-full z-10">
      {/* Main container inside header - adjust padding for smaller screens */}
      <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center"> {/* Adjusted px */}

        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-[#60a09b] flex-shrink-0"> {/* Adjusted text size, prevent shrinking */}
          <span>Jobsy</span>
        </div>

        {/* Navigation Links, CTA, and Language Switcher */}
        {/* Allow content to wrap on smaller screens, adjust space between items */}
        <div className="flex items-center flex-wrap justify-end space-x-2 sm:space-x-4 md:space-x-6"> {/* Adjusted space-x, added flex-wrap, justify-end */}

          {/* Language Switcher (Flags in a circle) */}
          {/* Adjust space between flags for smaller screens */}
          <div className="flex items-center space-x-1 sm:space-x-2"> {/* Adjusted space-x */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer flex-shrink-0"> {/* Adjusted size, prevent shrinking */}
              <img src="/flags/ar.png" alt="Arabic Flag" className="w-full h-full object-cover" title="Arabic"/>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer flex-shrink-0"> {/* Adjusted size, prevent shrinking */}
              <img src="/flags/ku.png" alt="Kurdish Flag" className="w-full h-full object-cover" title="Kurdish"/>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer flex-shrink-0"> {/* Adjusted size, prevent shrinking */}
              <img src="/flags/en.png" alt="English Flag" className="w-full h-full object-cover" title="English"/>
            </div>
            {/* TODO: Add actual language switching logic here */}
          </div>

          {/* Navigation Links and CTA */}
          {/* Adjust space between nav items and CTA */}
          <nav className="flex items-center space-x-2 sm:space-x-4 mx-2 sm:mx-5 flex-shrink-0"> {/* Adjusted space-x, mx, prevent shrinking */}
            <Link to="/about" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base">About</Link> {/* Adjusted text size */}
            <Link to="/contact" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base">Contact</Link> {/* Adjusted text size */}
          </nav>

          {/* Sign Up CTA Button */}
          {/* Adjust padding and text size for smaller screens */}
          <Link
            to="/signup"
            className="bg-[#60a09b] text-white py-1 px-3 sm:py-2 sm:px-6 rounded-full text-sm sm:text-lg font-semibold hover:bg-[#8e82b4] transition-colors flex-shrink-0" // Adjusted padding, text size, prevent shrinking
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
 );
}

export default Header;
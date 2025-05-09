// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation buttons

// Hero Section component with headline, subheadline, and CTA buttons
function HeroSection() {
  return (
    // Section container - Full viewport height, centered content
    // Added padding-top to account for the fixed header
    // Use a margin-top class that is at least the height of your sticky header
    <section className="relative w-full min-h-screen flex items-center justify-center text-center bg-[#fefef2] pt-16 md:pt-20 lg:pt-24"> {/* Added pt classes */}
      {/* Content container - centered and limited width */}
      {/* Added horizontal padding px-4 sm:px-6 */}
      <div className="container mx-auto px-4 sm:px-6 py-8"> {/* ADDED px-4 sm:px-6 */}
        {/* Headline with motto */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#355C7D] mb-4"> {/* Adjusted text size */}
          Where Talent Meets Opportunity.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto"> {/* Adjusted max-width, centered */}
          Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.
        </p>

        {/* CTA Buttons - Flex layout for side-by-side on larger screens */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center"> {/* Centered buttons */}
          {/* Get Started Button - Links to signup */}
          <Link
            to="/signup"
            className="bg-[#355C7D] hover:bg-[#456C9D] text-white font-semibold rounded-full px-8 py-3 transition-colors duration-300"
          >
            Get Started
          </Link>
          {/* Learn More Button - Links to About section (using #) or a separate page */}
           {/* Using <a> for internal page anchor */}
          <a
            href="#about-us" // Link to the About Us section ID
            className="bg-[#F8B195] hover:bg-[#F67280] text-[#355C7D] font-semibold rounded-full px-8 py-3 transition-colors duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Optional: Add an image or illustration here */}
        {/* <div className="mt-12">
            <img src="/path/to/your/hero-image.png" alt="Jobsy Hero" className="mx-auto max-w-md"/>
        </div> */}

      </div>
    </section>
  );
}

export default HeroSection;

// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation buttons
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// Hero Section component with headline, subheadline, and CTA buttons
function HeroSection() {
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  return (
    // Section container - Full viewport height, centered content
    // Added padding-top to account for the fixed header
    // Use a margin-top class that is at least the height of your sticky header
    <section className="relative w-full min-h-screen flex items-center justify-center text-center bg-[#fefef2] pt-16 md:pt-20 lg:pt-24"> {/* Added pt classes */}
      {/* Content container - centered and limited width */}
      {/* Added horizontal padding px-4 sm:px-6 */}
      <div className="container mx-auto px-4 sm:px-6 py-8"> {/* Ensure padding is here */}
        {/* Headline with motto - Use t() for translation */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#355C7D] mb-4"> {/* Adjusted text size */}
          {t('Where Talent Meets Opportunity.')} {/* Translated headline */}
        </h1>

        {/* Subheadline - Use t() for translation */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto"> {/* Adjusted max-width, centered */}
          {t('Find your next freelance opportunity or the perfect freelancer for your project. Jobsy connects talent and employers faster than ever.')} {/* Translated subheadline */}
        </p>

        {/* CTA Buttons - Flex layout for side-by-side on larger screens */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center"> {/* Centered buttons */}
          {/* Get Started Button - Links to signup - Use t() for button text */}
          <Link
            to="/signup"
            className="bg-[#355C7D] hover:bg-[#456C9D] text-white font-semibold rounded-full px-8 py-3 transition-colors duration-300"
          >
            {t('Get Started')} {/* Translated button text */}
          </Link>
          {/* Learn More Button - Links to About section (using #) or a separate page - Use t() for button text */}
           {/* Using <a> for internal page anchor */}
          <a
            href="#about-us" // Link to the About Us section ID
            className="bg-[#F8B195] hover:bg-[#F67280] text-[#355C7D] font-semibold rounded-full px-8 py-3 transition-colors duration-300"
          >
            {t('Learn More')} {/* Translated button text */}
          </a>
        </div>

        {/* Optional: Add an image or illustration here */}
        {/* <div className="mt-12">
            <img src="/path/to/your/hero-image.png" alt={t('Jobsy Hero Image')} className="mx-auto max-w-md"/> {/* Translate alt text too! */}
        {/* </div> */}

      </div>
    </section>
  );
}

export default HeroSection;

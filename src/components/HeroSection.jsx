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
    <section className=" relative w-full flex items-center justify-center text-center pt-16 md:pt-20 lg:pt-24"> {/* Added pt classes */}
      {/* Content container - centered and limited width */}
      {/* Added horizontal padding px-4 sm:px-6 */}
      <div className=" container my-[10vh] mx-auto px-4 sm:px-6 py-10"> {/* Ensure padding is here */}
        {/* Headline with motto - Use t() for translation */}
        <h1 className="text-8xl  font-bold text-[#60a09b] mb-4"> {/* Adjusted text size */}
          {t('Jobsy')} {/* Translated headline */}
        </h1>

        {/* Subheadline - Use t() for translation */}
        <p className="text-3xl text-gray-700 mb-10 max-w-3xl mx-auto"> {/* Adjusted max-width, centered */}
          {t('Where Talent Meets Opportunity.')} {/* Translated subheadline */}
        </p>

        <p className="text-lg text-gray-600 mb-10 max-w- mx-auto"> {/* Adjusted max-width, centered */}
          {t('Jobsy connects talent and employers faster than ever.Post jobs or find your dream role with ease.')} {/* Translated additional text */}
        </p>

        {/* CTA Buttons - Flex layout for side-by-side on larger screens */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center"> {/* Centered buttons */}
          {/* Get Started Button - Links to signup - Use t() for button text */}
          <Link
            to="/signup"
            className="bg-[#60a09b] hover:bg-[#456C9D] text-white font-semibold rounded-full px-8 py-3 transition-colors duration-300"
          >
            {t('create an account')} {/* Translated button text */}
          </Link>
          {/* Learn More Button - Links to About section (using #) or a separate page - Use t() for button text */}
           {/* Using <a> for internal page anchor */}
          <a
            href="/auth/login" // Link to the About Us section ID
            className="bg-[#F8B195] hover:bg-[#F67280] text-white font-semibold rounded-full px-8 py-3 transition-colors duration-300"
          >
            {t('Login')} {/* Translated button text */}
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

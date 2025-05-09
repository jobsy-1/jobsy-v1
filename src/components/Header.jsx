// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { useEffect } from 'react';

// Header component with logo, language switcher, nav links, and CTA
function Header() {
  // Use the hook to get the translation function 't' and the i18n instance
  const { t, i18n } = useTranslation();

  // Function to change the language when a flag is clicked
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Optional: You might want to save the selected language to localStorage
    // so it persists across visits. Example: localStorage.setItem('jobsy_language', lng);
  };

   // Optional: Effect to load saved language from local storage on app start
   // You would uncomment this and the import for useEffect if you want to save language preference


   useEffect(() => {
      const savedLanguage = localStorage.getItem('jobsy_language');
      if (savedLanguage && savedLanguage !== i18n.language) { // Check if a saved language exists and is different from current
          i18n.changeLanguage(savedLanguage);
      }
   }, [i18n]); // Dependency array includes i18n instance



  return (
    // Outer header: Sticky, centered, full width container for the rounded bar
    // Uses sticky positioning to stay at the top when scrolling
    <header className="sticky top-0 w-full z-10 flex justify-center">
      {/* Inner container: The actual rounded yellow bar with padding and margin */}
      {/* Flex layout to arrange logo, nav/flags/cta */}
      <div className="mx-2 my-2 px-3 py-1 flex justify-between items-center w-auto sm:w-auto">

        {/* Logo - Links to the home page */}
        {/* Using Link for internal navigation */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-[#60a09b] flex-shrink-0">
          {/* Use t() for the logo text */}
          <span>{t('Jobsy')}</span>
        </Link>

        {/* Navigation Links, CTA, and Language Switcher - Grouped in a flex container */}
        {/* Allows wrapping on smaller screens, adjusts spacing responsively */}
        <div className="flex items-center flex-wrap justify-end space-x-2 sm:space-x-4 md:space-x-6">

           {/* Navigation Links - Using <a> for internal page anchors */}
           {/* Note: For internal navigation in a React Router app, using <Link> is generally preferred over <a> to avoid full page reloads. */}
            <nav className="space-x-2 sm:space-x-4 mx-2 sm:mx-5 flex-shrink-0">
              {/* Use t() for link text */}
              <a href="#about-us" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base">{t('About')}</a>
              <a href="#contact" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base">{t('Contact')}</a>
              {/* Added links for Why Jobsy and Work sections - Use t() */}
              <a href="#why-jobsy" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base hidden sm:inline">{t('Why Jobsy?')}</a> {/* Hide on small screens */}
              <a href="#work-fun" className="text-[#60a09b] hover:text-[#8e82b4] text-sm sm:text-base hidden sm:inline">{t('Work Fun')}</a> {/* Hide on small screens */}
            </nav>

             {/* Language Switcher (Flags in a circle) - Add onClick handlers */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Individual flag containers - Add onClick to call changeLanguage */}
              {/* Ensure you have flag images in public/flags/ (ar.png, ku.png, en.png) */}
              <div
                 className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer"
                 onClick={() => changeLanguage('ar')} // Call changeLanguage with 'ar' code
              >
                {/* Use t() for the title attribute */}
                <img src="https://www.worldometers.info/img/flags/iz-flag.gif" alt={t('Arabic Flag')} className="w-full h-full object-cover" title={t('Arabic')}/>
              </div>
              <div
                 className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer"
                 onClick={() => changeLanguage('ku')} // Call changeLanguage with 'ku' code
              >
                 {/* Use t() for the title attribute */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_Kurdistan.svg" alt={t('Kurdish Flag')} className="w-full h-full object-cover" title={t('Kurdish')}/>
              </div>
              <div
                 className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer"
                 onClick={() => changeLanguage('en')} // Call changeLanguage with 'en' code
              >
                 {/* Use t() for the title attribute */}
                <img src="https://www.worldometers.info/img/flags/uk-flag.gif" alt={t('English Flag')} className="w-full h-full object-cover" title={t('English')}/>
              </div>
            </div>

            {/* Sign Up CTA Button - Links to the signup route */}
            {/* Using Link for internal navigation */}
            <Link
              to="/signup"
              className="bg-[#89cff0] text-white py-1 px-3 sm:py-2 sm:px-6 rounded-full text-sm sm:text-lg font-semibold hover:bg-[#8e82b4] transition-colors flex-shrink-0"
            >
              {/* Use t() for button text */}
              {t('Get Started')}
            </Link>
          </div>

        </div>
    </header>
  );
}

export default Header;

// src/components/WhyJobsySection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// Why Jobsy Section component highlighting key features
function WhyJobsySection() {
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  return (
    // Section container with ID for navigation
    <section id="why-jobsy" className="bg-[#fefef2] py-16 px-6">
      {/* Content container - centered and limited width */}
      {/* Added horizontal padding px-4 sm:px-6 */}
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6"> {/* Ensure padding is here */}
        {/* Section Title - Use t() for translation */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#60a09b] mb-12">{t('Why Jobsy?')}</h2>
        {/* Grid for features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-[#E6E6FA] rounded-2xl shadow-md p-8 transition-transform hover:scale-105">
            {/* Feature 1 Title - Use t() for translation */}
            <h3 className="text-xl font-semibold text-[#6A6A80] mb-4">{t('Post Jobs Instantly')}</h3>
            {/* Feature 1 Description - Use t() for translation */}
            <p className="text-[#6A6A80]">{t('Easily post jobs and get visibility in seconds. Connect with talent quickly!')}</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#FADADD] rounded-2xl shadow-md p-8 transition-transform hover:scale-105 text-white"> {/* Added text-white */}
            {/* Feature 2 Title - Use t() for translation */}
            <h3 className="text-[#A35C60] text-xl font-semibold mb-4">{t('Smart Matching')}</h3>
            {/* Feature 2 Description - Use t() for translation */}
            <p className='text-[#A35C60]' >{t('Jobsy connects you with the right candidates using intelligent algorithms.')}</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#CCE9FF] rounded-2xl shadow-md p-8 transition-transform hover:scale-105">
            {/* Feature 3 Title - Use t() for translation */}
            <h3 className="text-xl font-semibold text-[#3A6680] mb-4">{t('Real-Time Communication')}</h3>
            {/* Feature 3 Description - Use t() for translation */}
            <p className="text-[#3A6680]">{t('Chat directly with applicants or clients within the platform.')}</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyJobsySection;

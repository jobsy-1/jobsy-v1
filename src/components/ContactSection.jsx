// src/components/ContactSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the hook

// Contact Section component (Simple placeholder for now)
function ContactSection() {
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  return (
    // Section container with ID for navigation
    <section id="contact" className="bg-[#fefef2] py-16 px-6">
      {/* Content container - centered and limited width */}
      {/* Added horizontal padding px-4 sm:px-6 - assuming this was added previously */}
      <div className="max-w-md mx-auto text-center px-4 sm:px-6"> {/* Ensure padding is here */}
        {/* Section Title - Use t() for translation */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#60a09b] mb-8">{t('Get In Touch')}</h2>
        {/* Contact information or a simple form placeholder - Use t() */}
        <p className="text-lg text-gray-700 mb-4">
          {t('Have questions or feedback? We\'d love to hear from you!')}
        </p>
        <p className="text-lg text-gray-700">
          {t('Email')}: <a href="mailto:support@jobsy.app" className="text-[#60a09b] hover:underline">support@jobsy.app</a>
        </p>
        {/* You can add a contact form here later - remember to translate labels/placeholders */}
        {/* <form className="mt-8 space-y-4">
            <div>
                <input type="text" placeholder={t('Your Name')} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
                <input type="email" placeholder={t('Your Email')} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
                <textarea placeholder={t('Your Message')} rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
            </div>
            <button type="submit" className="bg-[#60a09b] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#8e82b4]">{t('Send Message')}</button>
        </form> */}
      </div>
    </section>
  );
}

export default ContactSection;

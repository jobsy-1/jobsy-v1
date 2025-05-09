// src/components/ContactSection.jsx
import React from 'react';

// Contact Section component (Simple placeholder for now)
function ContactSection() {
  return (
    // Section container with ID for navigation
    <section id="contact" className="bg-[#fefef2] py-16 px-6">
      {/* Content container - centered and limited width */}
      <div className="max-w-md mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#355C7D] mb-8">Get In Touch</h2>
        {/* Contact information or a simple form placeholder */}
        <p className="text-lg text-gray-700 mb-4">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <p className="text-lg text-gray-700">
          Email: <a href="mailto:support@jobsy.app" className="text-[#60a09b] hover:underline">support@jobsy.app</a>
        </p>
        {/* You can add a contact form here later */}
        {/* <form className="mt-8 space-y-4">
            <div>
                <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
                <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
                <textarea placeholder="Your Message" rows="4" className="w-full px-4 py-2 border rounded-md"></textarea>
            </div>
            <button type="submit" className="bg-[#60a09b] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#8e82b4]">Send Message</button>
        </form> */}
      </div>
    </section>
  );
}

export default ContactSection;

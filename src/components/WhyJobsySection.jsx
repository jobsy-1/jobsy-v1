// src/components/WhyJobsySection.jsx
import React from 'react';

// Why Jobsy Section component highlighting key features
function WhyJobsySection() {
  return (
    // Section container with ID for navigation
    <section id="why-jobsy" className="bg-white py-16 px-6">
      {/* Content container - centered and limited width */}
      {/* Added horizontal padding px-4 sm:px-6 */}
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6"> {/* ADDED px-4 sm:px-6 */}
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#355C7D] mb-12">Why Jobsy?</h2>
        {/* Grid for features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-[#F8B195] rounded-2xl shadow-md p-8 transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold text-[#355C7D] mb-4">Post Jobs Instantly</h3>
            <p className="text-gray-700">Easily post jobs and get visibility in seconds. Connect with talent quickly!</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#C06C84] rounded-2xl shadow-md p-8 transition-transform hover:scale-105 text-white"> {/* Added text-white */}
            <h3 className="text-xl font-semibold mb-4">Smart Matching</h3>
            <p>Jobsy connects you with the right candidates using intelligent algorithms.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#A8E6CE] rounded-2xl shadow-md p-8 transition-transform hover:scale-105">
            <h3 className="text-xl font-semibold text-[#355C7D] mb-4">Real-Time Communication</h3>
            <p className="text-gray-700">Chat directly with applicants or clients within the platform.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyJobsySection;

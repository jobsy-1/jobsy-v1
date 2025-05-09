// src/pages/LandingPage.jsx
import React from 'react';
// Import all the section components
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WhyJobsySection from '../components/WhyJobsySection';
import WorkThatFeelsFunSection from '../components/WorkThatFeelsFunSection';
import ContactSection from '../components/ContactSection';

// Main Landing Page component that assembles all the sections
function LandingPage() {
  return (
    // Main container for the entire landing page
    // Added min-h-screen, w-full, and overflow-x-hidden
    // w-full ensures it takes full width, overflow-x-hidden prevents horizontal scrolling
    <div className="min-h-screen mx-auto w-[99vw] overflow-x-hidden"> {/* ADDED w-full overflow-x-hidden */}

      {/* Render the Header component */}
      <Header />

      {/* Render all the section components */}
      {/* Each section component manages its own padding and width */}
      {/* HeroSection has padding-top to clear the fixed/sticky header */}
      <HeroSection />
      <WhyJobsySection />
      <WorkThatFeelsFunSection />
      <ContactSection />

      {/* Footer (Simple placeholder) */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-white"> {/* Added background */}
        © {new Date().getFullYear()} Jobsy. All rights reserved.
      </footer>

    </div>
  );
}

export default LandingPage;

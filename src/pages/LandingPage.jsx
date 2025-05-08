// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function LandingPage() {
  return (
    // === Modified Main Container ===
    // Added 'flex', 'flex-col' to enable flexbox layout in a column
    <div className="min-h-screen bg-gray-100 flex flex-col"> {/* Example background color */}

      {/* Header (remains the same) */}
      <Header />

      {/* === Modified Main Content Section === */}
      {/* Added 'flex-grow' to make this section take up remaining space */}
      <main className="container mx-auto px-4 py-8 flex-grow"> {/* Added flex-grow */}
        {/* Placeholder for landing page content */}
        <h1 className="text-4xl font-bold text-center text-[#355C7D]">
          Welcome to Jobsy
        </h1>
        <p className="mt-4 text-lg text-center text-gray-700">
          Find your next freelance opportunity or the perfect freelancer for your project.
        </p>
        {/* Add more landing page content here */}
      </main>

      {/* Footer (optional, add later - if present, flex-grow on main will push it to bottom) */}
      {/* <footer>...</footer> */}

    </div>
  );
}

export default LandingPage;
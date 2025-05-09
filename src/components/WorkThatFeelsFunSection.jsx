// src/components/WorkThatFeelsFunSection.jsx
import React from 'react';
import FloatingTag from './FloatingTag'; // Import the FloatingTag component
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// Define the tags and their gradient colors (These labels will be translated by FloatingTag)
const tags = [
    { label: "🧑‍🎨 Designer", gradient: "from-[#fceabb] to-[#f8b500]" },
    { label: "💻 Developer", gradient: "from-[#d4fc79] to-[#96e6a1]" },
    { label: "✍️ Writer", gradient: "from-[#fbc2eb] to-[#a6c1ee]" },
    { label: "📈 Marketer", gradient: "from-[#ffecd2] to-[#fcb69f]" },
    { label: "🎥 Video Editor", gradient: "from-[#a1c4fd] to-[#c2e9fb]" },
    { label: "🧑‍💼 Assistant", gradient: "from-[#fddb92] to-[#d1fdff]" },
    { label: "📊 Data Analyst", gradient: "from-[#c471f5] to-[#ff70a6]" },
    { label: "📱 Mobile Dev", gradient: "from-[#a8edea] to-[#fed6e3]" },
];

// Work That Feels Fun Section component with floating tags
function WorkThatFeelsFunSection() {
  // Call the hook to get the translation function 't'
  const { t } = useTranslation();

  return (
    // Section container with ID for navigation
    <section id="work-fun" className="relative py-24 px-6 bg-[#fefef2] overflow-hidden">
      {/* Content container - centered and limited width */}
      {/* Added horizontal padding px-4 sm:px-6 */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6"> {/* Ensure padding is here */}
        {/* Section Title - Use t() for translation */}
        <h2 className="text-4xl font-bold text-[#60a09b] mb-6">{t('Work that feels fun')}</h2>
        {/* Section Description - Use t() for translation */}
        <p className="text-gray-700 mb-12">{t('Explore a colorful world of job opportunities across various fields.')}</p>

        {/* Container for floating tags - uses flexbox to arrange tags */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Map over the tags array and render a FloatingTag for each */}
          {/* The FloatingTag component itself handles the translation of tag.label */}
          {tags.map((tag, idx) => (
            <FloatingTag key={idx} tag={tag} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkThatFeelsFunSection;

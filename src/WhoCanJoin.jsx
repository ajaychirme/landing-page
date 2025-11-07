import React from 'react';

const WhoCanJoin = () => {
  const categories = [
    {
      title: 'Education',
      items: [
        'Students aged 16+',
        'Recent graduates',
        'Apprentices',
        'Academic & support staff'
      ]
    },
    {
      title: 'Professionals',
      items: [
        'Trade union members',
        'Chartered institute members',
        'Professional body members',
        'Part-time learners'
      ]
    },
    {
      title: 'Public Sector',
      items: [
        'NHS staff',
        'Government employees',
        '.gov.uk email holders',
        'Royal society members'
      ]
    },
    {
      title: 'Learning',
      items: [
        'Professional qualifications',
        'Accredited courses',
        'Training providers',
        'Part-time students'
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Who Can Join TOTUM?
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            More people are eligible than you think - check if you qualify
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-500 hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-gray-100">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-gray-700">
                    <svg
                      className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-pink-600 border-2 border-pink-600 font-bold py-4 px-10 rounded-xl hover:bg-pink-50 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg w-full sm:w-auto text-base">
            Sign Up Today
          </button>
          <button className="bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold py-4 px-10 rounded-xl hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto text-base hover:from-pink-700 hover:to-pink-600">
            Check My Eligibility →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoCanJoin;
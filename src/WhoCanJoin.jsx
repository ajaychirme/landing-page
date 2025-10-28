import React from 'react';
import './WhoCanJoin.css';

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
    <div className="who-can-join-section">
      <div className="who-can-join-container">
        {/* Header */}
        <div className="who-can-join-header">
          <h2>Who Can Join TOTUM?</h2>
          <p>More people are eligible than you think - check if you qualify</p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <h3 className="category-title">{category.title}</h3>
              <ul className="category-list">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="category-item">
                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="cta-container">
          <button className="check-eligibility-btn">
            Check My Eligibility →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoCanJoin;
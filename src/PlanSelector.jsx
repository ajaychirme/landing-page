import React, { useState, useRef } from 'react';
import './PlanSelector.css';

const PlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState('students');
  const carouselRef = useRef(null);

  const plans = [
    {
      id: 'students',
      title: 'Students',
      subtitle: '16+, college, university',
      theme: 'pink'
    },
    {
      id: 'professionals',
      title: 'Professionals',
      subtitle: 'Trade unions, institutes',
      theme: 'pink'
    },
    {
      id: 'apprentices',
      title: 'Apprentices',
      subtitle: 'Learning on the job',
      theme: 'pink'
    },
    {
      id: 'public-sector',
      title: 'Public Sector',
      subtitle: 'NHS, Gov, Education',
      theme: 'pink'
    }
  ];

  // Popular offers data for each category
  const offersData = {
    students: [
      {
        id: 1,
        title: "Up to 60% off everything + Extra 10% Student Discount",
        brand: "PrettyLittleThing",
        logo: "PLT",
        tags: ["For students only", "Online", "Womens Fashion"],
        gradient: "linear-gradient(135deg, #2d1b3d, #4a2d5e)",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "50% Student Discount",
        brand: "Domino's Pizza",
        logo: "🍕",
        tags: ["For students only", "Online", "Pizza"],
        gradient: "linear-gradient(135deg, #0066cc, #0080ff)",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        title: "6 months free Prime for Students",
        brand: "Amazon",
        logo: "📦",
        tags: ["For students only", "Online", "Entertainment"],
        gradient: "linear-gradient(135deg, #f7f3e9, #e8dcc4)",
        image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        title: "10% Student Discount",
        brand: "JD Sports",
        logo: "JD",
        tags: ["For students only", "Online", "Fashion"],
        gradient: "linear-gradient(135deg, #1a1a1a, #333)",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop"
      }
    ],
    professionals: [
      {
        id: 1,
        title: "20% off Professional Services",
        brand: "LinkedIn Learning",
        logo: "LI",
        tags: ["For professionals only", "Online", "Education"],
        gradient: "linear-gradient(135deg, #0077b5, #00a0dc)",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Exclusive Professional Discounts",
        brand: "Adobe Creative Cloud",
        logo: "AD",
        tags: ["For professionals only", "Online", "Software"],
        gradient: "linear-gradient(135deg, #ff0000, #cc0000)",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        title: "25% off Business Essentials",
        brand: "Microsoft 365",
        logo: "M365",
        tags: ["For professionals only", "Online", "Productivity"],
        gradient: "linear-gradient(135deg, #f25022, #00a4ef)",
        image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        title: "Special Professional Rates",
        brand: "WeWork",
        logo: "WW",
        tags: ["For professionals only", "Workspace"],
        gradient: "linear-gradient(135deg, #000000, #333333)",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
      }
    ],
    apprentices: [
      {
        id: 1,
        title: "30% off Learning Materials",
        brand: "Skillshare",
        logo: "SK",
        tags: ["For apprentices only", "Online", "Learning"],
        gradient: "linear-gradient(135deg, #00d4b8, #008c7a)",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Free Tool Kit Discount",
        brand: "Screwfix",
        logo: "SF",
        tags: ["For apprentices only", "In-store", "Tools"],
        gradient: "linear-gradient(135deg, #0066b2, #004d87)",
        image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        title: "15% off Work Wear",
        brand: "Dickies",
        logo: "DK",
        tags: ["For apprentices only", "Online", "Clothing"],
        gradient: "linear-gradient(135deg, #c8102e, #8b0a1f)",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        title: "Student Apprentice Deals",
        brand: "City & Guilds",
        logo: "CG",
        tags: ["For apprentices only", "Certification"],
        gradient: "linear-gradient(135deg, #0052a5, #003d7a)",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
      }
    ],
    'public-sector': [
      {
        id: 1,
        title: "15% NHS Staff Discount",
        brand: "Boots",
        logo: "BT",
        tags: ["For NHS staff", "In-store", "Health & Beauty"],
        gradient: "linear-gradient(135deg, #00a1de, #007ba7)",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Public Sector Savings",
        brand: "Currys",
        logo: "CU",
        tags: ["For public sector", "Online", "Electronics"],
        gradient: "linear-gradient(135deg, #ed1c24, #b71c1c)",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        title: "20% off for Key Workers",
        brand: "The Body Shop",
        logo: "TBS",
        tags: ["For public sector", "Online", "Beauty"],
        gradient: "linear-gradient(135deg, #00a651, #007a3d)",
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        title: "Government Employee Perks",
        brand: "John Lewis",
        logo: "JL",
        tags: ["For public sector", "In-store", "Retail"],
        gradient: "linear-gradient(135deg, #006633, #004d26)",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
      }
    ]
  };

  const scrollAmount = 320;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const currentOffers = offersData[selectedPlan] || offersData.students;
  const currentTheme = plans.find(p => p.id === selectedPlan)?.theme || 'pink';
  const currentTitle = plans.find(p => p.id === selectedPlan)?.title || 'Students';

  return (
    <div className="plan-selector-section">
      <div className="plan-selector-container">
        {/* Header */}
        <div className="plan-selector-header">
          <h2>Choose Your TOTUM Plan</h2>
          <p>Select your category to see plans tailored for you</p>
        </div>

        {/* Plan Options */}
        <div className="plan-options">
          {plans.map((plan) => (
            <button
              key={plan.id}
              className={`plan-option ${selectedPlan === plan.id ? 'active' : ''} theme-${plan.theme}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <h3>{plan.title}</h3>
              <p>{plan.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Popular Offers Section */}
        <div className={`popular-offers-section theme-${currentTheme}`}>
          <div className="popular-offers-header">
            <h3>Popular Offers for {currentTitle}</h3>
            <a href="#" className={`view-all-link theme-${currentTheme}`}>View All →</a>
          </div>

          <div className="carousel-wrapper">
  <button 
    className={`nav-arrow left theme-${currentTheme}`}
    onClick={scrollLeft}
    aria-label="Scroll left"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
  <div className="carousel" ref={carouselRef}>
    {currentOffers.map((offer) => (
      <div key={offer.id} className={`discount-card theme-${currentTheme}`}>
        <div className="card-image" style={{ background: offer.gradient }}>
          <img src={offer.image} alt={offer.brand} />
          <div className={`brand-logo theme-${currentTheme}`}>{offer.logo}</div>
        </div>
        <div className="card-content">
          <h4 className="card-title">{offer.title}</h4>
          <p className="card-subtitle">{offer.brand}</p>
          <div className="card-tags">
            {offer.tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
  <button 
    className={`nav-arrow right theme-${currentTheme}`}
    onClick={scrollRight}
    aria-label="Scroll right"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
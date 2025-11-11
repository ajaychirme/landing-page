import React from "react";
import "./BannerSection.css";

const NewBanner = () => {
  const deals = [
    {
      title: "25% Student Discount",
      subtitle: "adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      title: "20% Student Discount",
      subtitle: "wagamama",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Wagamama_logo.svg",
    },
    {
      title: "Fast Fibre Broadband from £15 a month",
      subtitle: "Hyperoptic",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Hyperoptic_logo.svg",
    },
    {
      title: "Up to 30% off selected products at selected",
      subtitle: "MiXR",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Mixr_logo.svg",
    },
    {
      title: "FREE Large Combo + 20% Student Discount",
      subtitle: "ODEON",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Odeon_Cinemas_logo.svg",
    },
    {
      title: "6 months free Prime for Students",
      subtitle: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
  ];

  return (
    <>
      {/* 🌸 Existing Banner Section */}
      <div className="banner-container">
        <div className="banner">
          {/* Decorative elements */}
          <div className="decoration planet">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle cx="40" cy="40" r="25" strokeWidth="3" />
              <ellipse cx="40" cy="40" rx="45" ry="12" strokeWidth="3" />
            </svg>
          </div>

          <div className="decoration star">
            <svg viewBox="0 0 60 60" width="60" height="60">
              <path
                d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="decoration circle-small"></div>
          <div className="decoration circle-large"></div>
          <div className="decoration asterisk">✱</div>
          <div className="decoration circle-right"></div>
          <div className="decoration blob-bottom"></div>
          <div className="decoration blob-left"></div>

          <div className="content">
            <h1>The UK's No.1 Discount Card for All</h1>
            <p className="subtitle">
              For Students, Professionals, Apprentices & More
            </p>
          </div>
        </div>
      </div>

      {/* 🎓 Student Deals Section (Pink Gradient Version) */}
      <section className="student-deals-section">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="heading">
            The best student discounts from <br />
            your favourite shops
          </h1>
      
        </div>

        <div className="deals-grid">
          {/* Deals of the day */}
          <div className="deals-card">
            <h2 className="card-title">Student deals of the day</h2>
            <div className="deals-list">
              {deals.map((deal, index) => (
                <div key={index} className="deal-item">
                  <img
                    src={deal.logo}
                    alt={deal.subtitle}
                    className="deal-logo"
                  />
                  <div>
                    <p className="deal-title">{deal.title}</p>
                    <p className="deal-sub">{deal.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other promo cards */}
          <div className="promo-card">
            <img
              src="https://images.unsplash.com/photo-1600488993741-3c3b9b3f6c48?auto=format&fit=crop&w=600&q=80"
              alt="Halloween deals"
            />
            <div className="promo-content">
              <h3>No tricks, just Halloween deals</h3>
              <a>Discover More →</a>
            </div>
          </div>

          <div className="promo-card">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
              alt="Food & drink deals"
            />
            <div className="promo-content">
              <h3>Save more on food & drink</h3>
              <a>Discover More →</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewBanner;

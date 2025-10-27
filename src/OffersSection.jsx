import React, { useRef } from 'react';
import './OffersSection.css';

const OffersSection = () => {
  const popularCarouselRef = useRef(null);
  const featuredCarouselRef = useRef(null);

  const scrollAmount = 320; // 300px card + 20px gap

  const scrollLeft = (carouselRef) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = (carouselRef) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const popularDiscounts = [
    {
      id: 1,
      title: "Up to 60% off everything + Extra 10% Student Discount",
      brand: "PrettyLittleThing",
      logo: "PLT",
      gradient: "linear-gradient(135deg, #2d1b3d, #4a2d5e)",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "50% Student Discount",
      brand: "Domino's Pizza",
      logo: "🍕",
      gradient: "linear-gradient(135deg, #0066cc, #0080ff)",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "10% Student Discount",
      brand: "JD Sports",
      logo: "JD",
      gradient: "linear-gradient(135deg, #1a1a1a, #333)",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "6 months free Prime for Students",
      brand: "Amazon",
      logo: "📦",
      gradient: "linear-gradient(135deg, #f7f3e9, #e8dcc4)",
      image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Free Delivery",
      brand: "KFC",
      logo: "KFC",
      gradient: "linear-gradient(135deg, #e31837, #ff4444)",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop"
    }
  ];

  const featuredOffers = [
    {
      id: 1,
      title: "GET 25% OFF 12 MONTH STUDENT PRODUCT",
      brand: "The Gym Group",
      logo: "💪",
      gradient: "linear-gradient(135deg, #00a86b, #00d084)",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "GET 20% OFF THE ENTIRE GALAXY S25 SERIES PLUS GUARANTEED £100 OFF",
      brand: "Samsung",
      logo: "SAMS",
      gradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "UP TO 35% OFF AIRPORT PARKING",
      brand: "Holiday Extras",
      logo: "HE",
      gradient: "linear-gradient(135deg, #4a90e2, #5ca7f5)",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "25% OFF EVERYTHING* + AN EXTRA 10% OFF*",
      brand: "PrettyLittleThing",
      logo: "PLT",
      gradient: "linear-gradient(135deg, #2d1b3d, #4a2d5e)",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "GET 60% OFF YOUR FIRST MONTH OF THERAPY",
      brand: "BetterHelp",
      logo: "BH",
      gradient: "linear-gradient(135deg, #00a86b, #4ade80)",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "£175 WELCOME BONUS WHEN YOU SWITCH",
      brand: "First Direct",
      logo: "FD",
      gradient: "linear-gradient(135deg, #1a1a1a, #333)",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="offers-container">
            {/* Featured Offers Section */}
            <section className="offers-section">
        <div className="featured-header">FEATURED OFFERS</div>
        
        <div className="featured-carousel-wrapper">
          <button 
            className="nav-arrow left" 
            onClick={() => scrollLeft(featuredCarouselRef)}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <div className="featured-carousel" ref={featuredCarouselRef}>
            {featuredOffers.map((offer) => (
              <div key={offer.id} className="offer-card">
                <div className="offer-image" style={{ background: offer.gradient }}>
                  <img src={offer.image} alt={offer.brand} />
                  <div className="offer-brand">{offer.logo}</div>
                </div>
                <div className="offer-content">
                  <h3 className="offer-text">{offer.title}</h3>
                  <p className="offer-subtitle">{offer.brand}</p>
                  <div className="offer-tags">
                    {offer.tags?.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="nav-arrow right" 
            onClick={() => scrollRight(featuredCarouselRef)}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </section>
      {/* Popular Student Discounts Section */}
      <section className="offers-section">
        <div className="section-header">
          <div>
          <div className="featured-header">Highlights</div>
          </div>
          <a href="#" className="view-more">View More →</a>
        </div>

        <div className="carousel-wrapper">
          <button 
            className="nav-arrow left" 
            onClick={() => scrollLeft(popularCarouselRef)}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <div className="carousel" ref={popularCarouselRef}>
            {popularDiscounts.map((discount) => (
              <div key={discount.id} className="discount-card">
                <div className="card-image" style={{ background: discount.gradient }}>
                  <img src={discount.image} alt={discount.brand} />
                  <div className="brand-logo">{discount.logo}</div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{discount.title}</h3>
                  <p className="card-subtitle">{discount.brand}</p>
                  <div className="card-tags">
                    {discount.tags?.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="nav-arrow right" 
            onClick={() => scrollRight(popularCarouselRef)}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </section>
    </div>
  );
};

export default OffersSection;
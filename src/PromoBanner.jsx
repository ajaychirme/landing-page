import React, { useState, useEffect } from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('next');

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=600&fit=crop',
      emoji: '🎓',
      title: 'WIN £9,535 TOWARDS YOUR EDUCATION COSTS!',
      description: 'Paying off Tuition Costs? Got an outstanding Student Loan? You could WIN £9,535 towards your education costs this Freshers with TOTUM+',
      buttonText: 'FIND OUT MORE',
      bgGradient: 'linear-gradient(135deg, #c93f9e 0%, #ff4d8f 50%, #ff6ba9 100%)',
      accentColor: '#ff4d8f'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&h=600&fit=crop',
      emoji: '📱',
      title: 'SAVE £324 ON SAMSUNG GALAXY S25 ULTRA',
      description: 'Save £324 on Samsung Galaxy S25 Ultra + £100 Gift Card from £48.99. Enjoy the latest innovation with pro-level cameras and powerful performance.',
      buttonText: 'GET OFFER',
      bgGradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)',
      accentColor: '#3b82f6'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=600&fit=crop',
      emoji: '💪',
      title: 'UP TO 50% OFF + EXTRA 10% AT MYPROTEIN',
      description: 'Up to 50% off + extra 10% off at MYPROTEIN with TOTUM. Enjoy savings on high-quality protein, supplements, and nutrition essentials.',
      buttonText: 'GET OFFER',
      bgGradient: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)',
      accentColor: '#14b8a6'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=600&fit=crop',
      emoji: '✈️',
      title: 'GET UP TO £150 OFF AT TUI',
      description: 'Save up to £150 at TUI with your TOTUM membership. Perfect for students planning their next escape. Book your dream holiday for less.',
      buttonText: 'GET OFFER',
      bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)',
      accentColor: '#a78bfa'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1600&h=600&fit=crop',
      emoji: '🎵',
      title: 'WIN A TRIP TO SZIGET FESTIVAL 2026',
      description: 'Get up to £100 and the chance to win a trip for 2 to Sziget Festival 2026. Sign up and spend once to get £20, plus more rewards!',
      buttonText: 'GET OFFER',
      bgGradient: 'linear-gradient(135deg, #db00ff 0%, #c93f9e 50%, #ff4d8f 100%)',
      accentColor: '#c93f9e'
    }
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="promo-banner-modern"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="promo-slides-wrapper">
        {slides.map((slide, index) => {
          let slideClass = 'promo-slide-modern';
          
          if (index === currentSlide) {
            slideClass += ' active';
          } else if (
            (direction === 'next' && index === (currentSlide - 1 + slides.length) % slides.length) ||
            (direction === 'prev' && index === (currentSlide + 1) % slides.length)
          ) {
            slideClass += direction === 'next' ? ' exit-left' : ' exit-right';
          }

          return (
            <div
              key={slide.id}
              className={slideClass}
              style={{ background: slide.bgGradient }}
            >
              <div className="promo-slide-bg" style={{ backgroundImage: `url(${slide.image})` }}></div>
              <div className="promo-overlay"></div>
              
              <div className="promo-content-wrapper">
                <div className="promo-content-modern">
                  <div className="promo-text-content promo-final">
                    <h2 className="promo-title-modern">{slide.title}</h2>
                    <p className="promo-description-modern">{slide.description}</p>
                    <button 
                      className="promo-button-modern"
                      style={{ 
                        background: 'white',
                        color: slide.accentColor,
                        boxShadow: `0 8px 32px ${slide.accentColor}40`
                      }}
                    >
                      {slide.buttonText}
                      <svg className="button-arrow" viewBox="0 0 24 24" width="20" height="20">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="promo-image-content">
                    <div className="promo-image-frame promo-final-frame">
                      <img src={slide.image} alt={slide.title} className="promo-featured-image" />
                      <div className="image-glow" style={{ background: slide.accentColor }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="promo-arrow promo-arrow-left" onClick={prevSlide} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button className="promo-arrow promo-arrow-right" onClick={nextSlide} aria-label="Next slide">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="promo-dots-container">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`promo-dot-modern ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="promo-progress-bar">
        <div 
          className="promo-progress-fill"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        ></div>
      </div>
    </div>
  );
};

export default PromoBanner;
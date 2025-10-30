import React, { useState, useEffect } from "react";

const PromoBanner1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=600&fit=crop",
      emoji: "🎓",
      title: "WIN £9,535 TOWARDS YOUR EDUCATION COSTS!",
      description:
        "Paying off Tuition Costs? Got an outstanding Student Loan? You could WIN £9,535 towards your education costs this Freshers with TOTUM+",
      buttonText: "FIND OUT MORE",
      accentColor: "#c93f9e",
      lightAccent: "#ff4d8f",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&h=600&fit=crop",
      emoji: "📱",
      title: "SAVE £324 ON SAMSUNG GALAXY S25 ULTRA",
      description:
        "Save £324 on Samsung Galaxy S25 Ultra + £100 Gift Card from £48.99. Enjoy the latest innovation with pro-level cameras and powerful performance.",
      buttonText: "GET OFFER",
      accentColor: "#2563eb",
      lightAccent: "#3b82f6",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=600&fit=crop",
      emoji: "💪",
      title: "UP TO 50% OFF + EXTRA 10% AT MYPROTEIN",
      description:
        "Up to 50% off + extra 10% off at MYPROTEIN with TOTUM. Enjoy savings on high-quality protein, supplements, and nutrition essentials.",
      buttonText: "GET OFFER",
      accentColor: "#059669",
      lightAccent: "#10b981",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&h=600&fit=crop",
      emoji: "✈️",
      title: "GET UP TO £150 OFF AT TUI",
      description:
        "Save up to £150 at TUI with your TOTUM membership. Perfect for students planning their next escape. Book your dream holiday for less.",
      buttonText: "GET OFFER",
      accentColor: "#7b3fb8",
      lightAccent: "#9333ea",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1600&h=600&fit=crop",
      emoji: "🎵",
      title: "WIN A TRIP TO SZIGET FESTIVAL 2026",
      description:
        "Get up to £100 and the chance to win a trip for 2 to Sziget Festival 2026. Sign up and spend once to get £20, plus more rewards!",
      buttonText: "GET OFFER",
      accentColor: "#db00ff",
      lightAccent: "#c93f9e",
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection("next");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className="promo1-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
  .promo1-container {
    width: 100%;
    height: 450px;
    position: relative;
    overflow: hidden;
    border-top: 3px solid #f3f4f6;
    border-bottom: 3px solid #f3f4f6;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  }

  .promo1-slides {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .promo1-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .promo1-slide.active {
    opacity: 1;
    visibility: visible;
    z-index: 2;
  }

  .promo1-slide-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 80px;
    background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  }

  .promo1-content {
    max-width: 1400px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .promo1-text {
    position: relative;
    z-index: 3;
    margin-left: 4em;
  }

  .promo1-title {
    font-size: 2.8rem;
    font-weight: 800;
    color: #1a1a1a;
    line-height: 1.15;
    margin-bottom: 20px;
  }

  .promo1-desc {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #666;
    margin-bottom: 32px;
  }

  .promo1-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 18px 48px;
    font-size: 1rem;
    font-weight: 700;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    text-transform: uppercase;
    color: white;
    letter-spacing: 0.5px;
    transition: all 0.4s ease;
  }

  .promo1-btn:hover {
    transform: translateY(-3px) scale(1.05);
  }

  .promo1-img-wrap {
    position: relative;
    width: 100%;
    height: 350px;
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    margin-right: 15em;
  }

  .promo1-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .promo1-img-wrap:hover .promo1-img {
    transform: scale(1.08);
  }

  .promo1-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
  }

  .promo1-arrow svg {
    stroke: #6b7280;
    transition: stroke 0.3s ease;
  }

  .promo1-arrow:hover {
    background-color: #fff0fa;
    border-color: #c93f9e;
    transform: translateY(-50%) scale(1.1);
  }

  .promo1-arrow:hover svg {
    stroke: #c93f9e;
  }

  .promo1-left {
    left: 30px;
  }

  .promo1-right {
    right: 30px;
  }

  .promo1-dots {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    gap: 12px;
    z-index: 10;
    padding: 14px 28px;
    border-radius: 50px;
    background: white;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  }

  .promo1-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d1d5db;
    border: none;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .promo1-dot.active {
    width: 36px;
    border-radius: 8px;
    background: linear-gradient(135deg, #c93f9e, #ff4d8f);
  }
      `}</style>

      <div className="promo1-slides">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`promo1-slide ${i === currentSlide ? "active" : ""}`}
          >
            <div className="promo1-slide-inner">
              <div className="promo1-content">
                <div className="promo1-text">
                  <h2 className="promo1-title">{slide.title}</h2>
                  <p className="promo1-desc">{slide.description}</p>
                  <button
                    className="promo1-btn"
                    style={{
                      background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.lightAccent})`,
                    }}
                  >
                    {slide.buttonText} →
                  </button>
                </div>

                <div className="promo1-img-wrap">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="promo1-img"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="promo1-arrow promo1-left"
        onClick={prevSlide}
        aria-label="Previous"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        className="promo1-arrow promo1-right"
        onClick={nextSlide}
        aria-label="Next"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="promo1-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`promo1-dot ${i === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner1;
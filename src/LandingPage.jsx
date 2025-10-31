import React, { useState, useEffect } from "react";
import splash1 from "./assets/splash-image-1.png";
import totumSearch from "./assets/totum-search.png";
import FeaturedOffers from "./OffersSection.jsx";
import WhyTotum from "./WhyTotum.jsx";
import PromoBanner1 from "./PromoBanner1.jsx";
import WhoCanJoin from "./WhoCanJoin.jsx";
import FAQSection from "./FAQSection.jsx";
import PlanSelector from "./PlanSelector.jsx";
import DealsSection from "./DealsSection.jsx";
import DiscountBanner from "./DiscountBanner.jsx";
import NewBanner from "./NewBanner.jsx";
import StudentDealsSection from "./StudentDealsSection.jsx";
import AnimationDeals from "./AnimationDeals.jsx";
import "./landingPage.css";

function LandingPage() {
  const spanText = [
    "10% OFF EVERYTHING",
    "GRAB AMAZING DEALS TODAY & EXTRA 30% OFF FOR NEW USERS",
    "SALE – up to 40% off RAC Breakdown Cover",
    "£20 AMAZON.CO.UK GIFT CARD* WHEN YOU PURCHASE A NEW CAR INSURANCE POLICY",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showAnimationDeals, setShowAnimationDeals] = useState(true); // 🔥 toggle state

  useEffect(() => {
    const fadeDuration = 1000;
    const visibleDuration = 2000;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % spanText.length);
        setFade(true);
      }, fadeDuration);
    }, visibleDuration + fadeDuration * 2);

    return () => clearInterval(interval);
  }, [spanText.length]);

  return (
    <div>
      {/* Ticker Bar */}
      <div
        className="sticky-div"
        style={{
          position: "sticky",
          top: "0",
          zIndex: 100,
          backgroundColor: "white",
          paddingBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            background: "linear-gradient(to right, #6a1a8c, #db00ff, #ff007f)",
            width: "100%",
            height: "40px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "18px",
            fontStyle: "italic",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              opacity: fade ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              whiteSpace: "nowrap",
            }}
          >
            {spanText[index]}
          </span>
        </div>

        {/* Search Box */}
        <div>
          <img src={totumSearch} alt="totum-search" />
        </div>
      </div>

      {/* 🔘 Toggle Button */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={() => setShowAnimationDeals(!showAnimationDeals)}
          style={{
            background: "linear-gradient(90deg, #6a1a8c, #db00ff, #ff007f)",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "transform 0.2s ease, background 0.5s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          {showAnimationDeals ? "Show Student Deals" : "Show Animated Deals"}
        </button>
      </div>

      {/* 🔄 Conditional Rendering */}
      {showAnimationDeals ? <AnimationDeals /> : <StudentDealsSection />}

      {/* 🔥 Other Sections */}
      <PromoBanner1 />
      <WhoCanJoin />
      <FeaturedOffers />
      <PlanSelector />
      <WhyTotum />
      <FAQSection />
    </div>
  );
}

export default LandingPage;

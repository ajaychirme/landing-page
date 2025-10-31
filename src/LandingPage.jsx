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
  const [showPromo1, setShowPromo1] = useState(false); // 🔥 state for toggling banners

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

      {/* Splash Image */}
      {/* <div className="banner-container">
        <div className="banner">
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
        <div className="offer-box-container">
              <div className="left-offer-box">

              </div>
              <div>
                <div className="right-offer-1"></div>
                <div className="right-offer-2"></div>
              </div>
            </div>
      </div> */}

{/* <DealsSection/> */}
      <StudentDealsSection/>
      {/* <DiscountBanner/> */}
      {/* <NewBanner/> */}

      {/* 🔥 Conditionally Render the Promo Banner */}
<PromoBanner1 />

      {/* Other Sections */}
      <WhoCanJoin />
      <FeaturedOffers />
      <PlanSelector />
      <WhyTotum />
      <FAQSection />
    </div>
  );
}

export default LandingPage;

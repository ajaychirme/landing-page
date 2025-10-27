import React, { useState, useEffect } from "react";
import splash1 from "./assets/splash-image-1.png";
import totumSearch from "./assets/totum-search.png";
import FeaturedOffers from "./OffersSection.jsx";
import WhyTotum from "./WhyTotum.jsx";
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

  useEffect(() => {
    const fadeDuration = 1000; // fade in/out time (ms)
    const visibleDuration = 2000; // visible time (ms)

    const interval = setInterval(() => {
      // fade out first
      setFade(false);
      // after fade-out, switch text and fade in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % spanText.length);
        setFade(true);
      }, fadeDuration);
    }, visibleDuration + fadeDuration * 2); // total cycle time

    return () => clearInterval(interval);
  }, [spanText.length]);

  return (
    <div>
      {/* Ticker Bar */}
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
            transition: "opacity 1s ease-in-out", // smoother fade
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
      {/* Splash Image */}
      <div class="banner-container">
        <div class="banner">
          <div class="decoration planet">
            <svg viewBox="0 0 80 80" width="80" height="80">
              <circle cx="40" cy="40" r="25" stroke-width="3" />
              <ellipse cx="40" cy="40" rx="45" ry="12" stroke-width="3" />
            </svg>
          </div>

          <div class="decoration star">
            <svg viewBox="0 0 60 60" width="60" height="60">
              <path
                d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z"
                stroke-width="2.5"
              />
            </svg>
          </div>

          <div class="decoration circle-small"></div>
          <div class="decoration circle-large"></div>
          <div class="decoration asterisk">✱</div>
          <div class="decoration circle-right"></div>
          <div class="decoration blob-bottom"></div>
          <div class="decoration blob-left"></div>

          <div class="content">
            <h1>The UK's No.1 Discount Card for All</h1>
            <p class="subtitle">
              For Students, Professionals, Apprentices & More
            </p>
            <p class="description">
              TOTUM means 'all' - because everyone deserves access to great
              savings. Trade union members, chartered professionals, NHS staff
              and more anywhere else.
            </p>
            <button class="cta-button">Start Saving Now</button>
          </div>
        </div>
      </div>

      {/* featured offer section*/}
      <FeaturedOffers />
      <WhyTotum />
    </div>

    

  );
}

export default LandingPage;

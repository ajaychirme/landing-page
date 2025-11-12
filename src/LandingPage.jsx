import React, { useState, useEffect } from "react";
// import splash1 from "./assets/splash-image-1.png";
// import totumSearch from "./assets/totum-search.png";

// import FeaturedOffers from "./OffersSection.jsx";
import TotumNavbar from "./TotumNavbar.jsx";
import WhyTotum from "./WhyTotum.jsx";
import SSHightlighs from "./SSHightlighs.jsx";
import LatestNews from "./LatestNews.jsx";
import DealsToggleWrapper from "./DealsToggleWrapper.jsx";
// import PromoBanner1 from "./PromoBanner1.jsx";
import WhoCanJoin from "./WhoCanJoin.jsx";
import FAQSection from "./FAQSection.jsx";
import PlanSelector from "./PlanSelector.jsx";
import VerificationBanner from "./VerificationBanner.jsx";
// import VerificationBanner1 from './VerificationBanner1.jsx';
// import DealsSection from "./DealsSection.jsx";
// import DiscountBanner from "./DiscountBanner.jsx";
// import NewBanner from "./NewBanner.jsx";
// import CategoriesSection from "./CategoriesSection.jsx";
// import StudentDealsSection from "./StudentDealsSection.jsx";
// import StudentDealsSection1 from "./StudentDealsSection1.jsx";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  
<div className="sticky top-0 z-50">
  {/* Gradient banner */}
  <div
    className="flex items-center justify-center text-white px-4 py-2 cursor-pointer font-bold italic relative overflow-hidden"
    style={{
      background: "linear-gradient(to right, #6a1a8c, #db00ff, #ff007f)",
      minHeight: "40px",
    }}
  >
    <span
      className="absolute transition-opacity duration-1000 text-center px-2"
      style={{
        opacity: fade ? 1 : 0,
        fontSize: "clamp(12px, 3.5vw, 18px)",
        lineHeight: "1.3",
        maxWidth: "95%",
      }}
    >
      {spanText[index]}
    </span>
  </div>

  {/* Navbar */}
  <TotumNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
</div>


      <DealsToggleWrapper isLoggedIn={isLoggedIn} />

      {!isLoggedIn && <WhoCanJoin />}
      {!isLoggedIn && <WhyTotum />}
      <SSHightlighs isLoggedIn={isLoggedIn} />
      <PlanSelector />
      {isLoggedIn && <VerificationBanner />}
      {/* <VerificationBanner1/> */}
      <LatestNews />
      {isLoggedIn && <WhyTotum isLoggedIn={isLoggedIn} />}
      <FAQSection isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default LandingPage;

import React, { useEffect } from "react";
import "./StudentDealsSection3.css";

const StudentDealsSection3 = ({ isLoggedIn=true }) => {

  const deals = [
    { title: "£10 FOR 80GB - UNLIMITED SOCIAL MEDIA + 1ST MONTH FREE", subtitle: "adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
    { title: "FIND YOUR PERFECT SOMEWHERE WITH 10% OFF HOTELS AT HOTELS.COM", subtitle: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { title: "SAVE ON MAC AND IPAD FOR UNI", subtitle: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
    { title: "SAVE UP TO £400 ON YOUR NEXT EASYJET HOLIDAY (MINIMUM SPEND APPLIES)", subtitle: "ZARA", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg" }
  ];

  useEffect(() => { console.log("hii", isLoggedIn); }, [isLoggedIn]);

  return (
    <div className="student-wrapper">

      {!isLoggedIn && (
        <section className="hero-banner">
          <div className="blur-circle c1"></div>
          <div className="blur-circle c2"></div>
          <div className="blur-circle c3"></div>

          <div className="hero-content">
            <h1>The UK's No. 1 Discount Card for Students, Professionals & Apprentices</h1>
            <p>Your new favourite student discount website with deals you won't find anywhere else</p>

            <div className="hero-buttons">
              <button className="btn-white">FIND OUT MORE</button>
              <button className="btn-pink">SIGN UP TODAY</button>
            </div>
          </div>
        </section>
      )}

      {isLoggedIn && (
        <section className="hero-banner logged-in">
          <div className="hero-content">
            <h1>The UK's No. 1 Discount Card for Students, Professionals & Apprentices</h1>
            <p>
              Exclusive student discounts, professional offers and apprentice deals. Plus free cashback, ID and international offers from +500 brands.
            </p>
          </div>
        </section>
      )}

      {isLoggedIn && (
        <div className="cards-root">
          <div className="cards-container">

            <div className="deals-card">
              <div className="deals-grid">
                {deals.map((deal, i) => (
                  <div className="deal-row" key={i}>
                    <div className="deal-logo">
                      <img src={deal.logo} alt={deal.subtitle} />
                    </div>
                    <span>{deal.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="image-card">
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80" />
              <div className="card-footer">
                <h3>Save more on food & drink</h3>
                <a href="/discount-more">Discover More →</a>
              </div>
            </div>

            <div className="image-card">
              <img src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=600&q=80" />
              <div className="card-footer">
                <h3>No tricks, just Halloween deals</h3>
                <a href="/discount-more">Discover More →</a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDealsSection3;

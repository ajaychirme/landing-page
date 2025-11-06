import React, { useState } from "react";
import brandingLogo from "./branding-image.svg";

const TotumNavbar = ({isLoggedIn, setIsLoggedIn}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const discountOptions = [
    { icon: "🔥", label: "Trending Offers" },
    { icon: "💄", label: "Beauty" },
    { icon: "👗", label: "Fashion" },
    { icon: "📱", label: "Tech & Mobile" },
    { icon: "✈️", label: "Travel" },
    { icon: "💪", label: "Health & Fitness" },
    { icon: "🍔", label: "Food & Drink" },
    { icon: "🎬", label: "Entertainment" },
    { icon: "📚", label: "Education" },
    { icon: "🎁", label: "Gifting" },
    { icon: "🏠", label: "Home & Finance" },
    { icon: "🚗", label: "Automotive" },
  ];

  const membershipOptions = [
    { icon: "🚀", label: "Join Today" },
    { icon: "🎓", label: "Student Members" },
    { icon: "💼", label: "Professional Members" },
    { icon: "🔧", label: "Apprentice Members" },
    { icon: "🎫", label: "D-pass" },
    { icon: "❓", label: "How it works" },
  ];

  const communityOptions = [
    { icon: "🎉", label: "Giveaways" },
    { icon: "💬", label: "Totum talks" },
    { icon: "📺", label: "totum tv" },
  ];

  const navItems = [
    {
      id: "discounts",
      label: "Discounts",
      hasDropdown: true,
      options: discountOptions,
    },
    { id: "brands", label: "Brands", hasDropdown: false },
    {
      id: "membership",
      label: "Membership",
      hasDropdown: true,
      options: membershipOptions,
    },
    {
      id: "community",
      label: "Community",
      hasDropdown: true,
      options: communityOptions,
    },
    { id: "help", label: "Help", hasDropdown: false },
  ];

  const handleMouseEnter = (itemId) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="navbar-wrapper">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .logo-svg {
          height: 55px;
          width: auto;
        }

        .navbar-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          position: relative;
        }

        .top-header {
          background: white;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .search-container {
          flex: 1;
          max-width: 500px;
          margin: 0 40px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 14px 20px 14px 50px;
          border: 2px solid #e5e7eb;
          border-radius: 50px;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #c93f9e;
          box-shadow: 0 0 0 3px rgba(201, 63, 158, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 1.2rem;
        }

        .auth-buttons {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .login-btn {
          background: transparent;
          border: none;
          color: #1a1a1a;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          padding: 10px 20px;
          transition: color 0.3s ease;
        }

        .login-btn:hover {
          color: #c93f9e;
        }

        .join-btn {
          background: linear-gradient(135deg, #c93f9e, #ff4d8f);
          color: white;
          border: none;
          padding: 12px 32px;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .join-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(201, 63, 158, 0.3);
        }

        .main-nav {
          background: white;
          position: relative;
          z-index: 100;
        }

        .nav-list {
          display: flex;
          justify-content: center;
          list-style: none;
          gap: 90px;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 20px 0;
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
          transition: color 0.3s ease;
          cursor: pointer;
          border-bottom: 3px solid transparent;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #c93f9e;
          border-bottom-color: #c93f9e;
        }

        .dropdown-icon {
          font-size: 0.7rem;
          transition: transform 0.3s ease;
        }

        .nav-item:hover .dropdown-icon {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          padding: 16px;
          min-width: 240px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          margin-top: -3px;
          z-index: 1000;
        }

        .dropdown-menu.large {
          min-width: 280px;
        }

        .nav-item:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 14px;
          color: #1a1a1a;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .dropdown-item:hover {
          background: linear-gradient(135deg, #c93f9e, #ff4d8f);
          color: white;
          transform: translateX(4px);
        }

        .dropdown-icon-left {
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 10px;
          color: #1a1a1a;
        }

        .mobile-nav {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 9999;
          overflow-y: auto;
          padding: 20px;
        }

        .mobile-nav.open {
          display: block;
        }

        .mobile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
        }

        .mobile-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #c93f9e, #ff4d8f);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.3rem;
          font-weight: 900;
          margin-right: 8px;
        }

        .mobile-logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #c93f9e;
        }

        .close-btn {
          background: transparent;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #1a1a1a;
        }

        .mobile-nav-list {
          list-style: none;
        }

        .mobile-nav-item {
          margin-bottom: 8px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover {
          background: #f9fafb;
          color: #c93f9e;
        }

        .mobile-dropdown {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding-left: 20px;
        }

        .mobile-dropdown.open {
          max-height: 1000px;
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #666;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
          margin: 4px 0;
        }

        .mobile-dropdown-item:hover {
          background: linear-gradient(135deg, #c93f9e, #ff4d8f);
          color: white;
        }

        @media (max-width: 1024px) {
          .nav-list {
            gap: 30px;
          }

          .search-container {
            max-width: 300px;
            margin: 0 20px;
          }
        }

        @media (max-width: 768px) {
          .top-header {
            padding: 15px 20px;
          }

          .search-container {
            display: none;
          }

          .auth-buttons {
            gap: 8px;
          }

          .login-btn {
            padding: 8px 12px;
            font-size: 0.9rem;
          }

          .join-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .main-nav {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .logo-svg {
            height: 45px;
          }

          .join-btn {
            padding: 8px 16px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      {/* Top Header */}
      <div className="top-header">
        <a href="/" className="logo">
          <img src={brandingLogo} alt="TOTUM Logo" className="logo-svg" />
        </a>

        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search brands or offers"
          />
        </div>

        <div className="auth-buttons">
          <button className="login-btn">LOGIN</button>
          <button 
  onClick={() => setIsLoggedIn(!isLoggedIn)} 
  className="join-btn"
>
  {isLoggedIn ? 'User' : 'JOIN NOW'}
</button>

        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="main-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="nav-item"
              onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className={`nav-link ${
                  activeDropdown === item.id ? "active" : ""
                }`}
              >
                {item.label}
                {item.hasDropdown && <span className="dropdown-icon">▼</span>}
              </a>

              {item.hasDropdown && (
                <div
                  className={`dropdown-menu ${
                    item.id === "discounts" ? "large" : ""
                  }`}
                >
                  {item.options.map((option, idx) => (
                    <a key={idx} className="dropdown-item">
                      <span className="dropdown-icon-left">{option.icon}</span>
                      {option.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <a href="/" className="mobile-logo">
            <div className="mobile-logo-icon">T</div>
            <span className="mobile-logo-text">TOTUM</span>
          </a>
          <button
            className="close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            ×
          </button>
        </div>

        <ul className="mobile-nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="mobile-nav-item">
              <a
                className="mobile-nav-link"
                onClick={() =>
                  item.hasDropdown &&
                  setActiveDropdown(activeDropdown === item.id ? null : item.id)
                }
              >
                {item.label}
                {item.hasDropdown && (
                  <span className="dropdown-icon">
                    {activeDropdown === item.id ? "▲" : "▼"}
                  </span>
                )}
              </a>

              {item.hasDropdown && (
                <div
                  className={`mobile-dropdown ${
                    activeDropdown === item.id ? "open" : ""
                  }`}
                >
                  {item.options.map((option, idx) => (
                    <a key={idx} className="mobile-dropdown-item">
                      <span className="dropdown-icon-left">{option.icon}</span>
                      {option.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: "30px",
            paddingTop: "30px",
            borderTop: "2px solid #f0f0f0",
          }}
        >
          <button
            className="join-btn"
            style={{ width: "100%", marginBottom: "12px" }}
          >
            JOIN NOW
          </button>
          <button
            className="login-btn"
            style={{ width: "100%", textAlign: "center" }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotumNavbar;
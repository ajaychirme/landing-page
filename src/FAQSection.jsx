import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection = ({isLoggedIn}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Who can join TOTUM?',
      answer: 'TOTUM is available to students aged 16+, recent graduates, apprentices, NHS staff, trade union members, chartered professionals, and many more. We believe everyone deserves access to great discounts! Simply check your eligibility on our platform to see if you qualify for membership.'
    },
    {
      question: 'What discounts and offers do I get?',
      answer: 'With TOTUM, you get access to over 4,000+ exclusive discounts from top brands across fashion, food, travel, technology, entertainment, and more. Enjoy deals like 10-50% off at popular retailers, special student pricing, exclusive online offers, and in-store discounts. Our partnerships ensure you always get the best deals available.'
    },
    {
      question: 'How much can I save with TOTUM?',
      answer: 'On average, TOTUM members save £243 per year on everyday purchases! Many members report saving even more by taking advantage of our exclusive deals on fashion, food delivery, travel, and entertainment. The more you use TOTUM, the more you save. Your membership typically pays for itself within the first few uses!'
    },
    {
      question: 'How much does TOTUM membership cost?',
      answer: 'TOTUM membership is incredibly affordable at just £14.99 per year for students and £4.99 for eligible professionals and public sector workers. Given the average member saves £243 annually, your membership pays for itself many times over! We also offer special promotions throughout the year for new members.'
    },
    {
      question: 'What makes TOTUM different from other discount cards?',
      answer: 'TOTUM is the UK\'s most widely recognized discount service with exclusive partnerships you won\'t find elsewhere. We offer 24/7 access via our website and mobile app, both online and in-store discounts, and are backed by NUS (National Union of Students). Plus, our card is accepted by more retailers than any other student discount service in the UK.'
    },
    {
      question: 'How do I use my TOTUM card?',
      answer: 'Using your TOTUM card is simple! For online shopping, just log in to your account, find the retailer, and use the unique discount code provided. For in-store purchases, show your digital TOTUM card (available in our app) or your physical card at checkout. Many retailers also integrate TOTUM verification directly into their checkout process for seamless savings.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={isLoggedIn ? "faq-section-loggedin" : "faq-section"}>
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <h2>FAQs</h2>
        </div>

        {/* FAQ Items */}
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="question-text">{faq.question}</span>
                <span className="faq-icon">
                  <svg
                    className={`icon-plus ${activeIndex === index ? 'rotate' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </button>
              <div
                className={`faq-answer-wrapper ${activeIndex === index ? 'open' : ''}`}
              >
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQSection;
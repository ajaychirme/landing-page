import React from 'react';
import './WhyTotum.css';

const WhyTotum = () => {
    
  const benefits = [
    {
      icon: '📱',
      title: 'Only on TOTUM',
      description: "Big brands and offers you won't find anywhere else."
    },
    {
      icon: '💰',
      title: '1000s of dreamy deals',
      description: 'Enjoy thousands of student offers, all in one place.'
    },
    {
      icon: '💳',
      title: 'Whenever, wherever',
      description: 'Get discounts 24/7 on our website or must-have app.'
    }
  ];

  const stats = [
    { number: '£2.4M', label: 'Saved This Month' },
    { number: '4,000+', label: 'Retailers' },
    { number: '£243', label: 'Avg. Cashback/Year' },
    { number: '1M+', label: 'Active Members' }
  ];

  const testimonials = [
    {
      title: 'By far the best',
      text: '"TOTUM is by far the best student app there is. From giving free stuff, to giving amazing discounts of high value, and in-store offers, they have everything you possibly need."',
      author: 'Avenoor Gulati',
      role: 'First year undergraduate student',
      avatar: 'AG'
    },
    {
      title: 'Life changing',
      text: '"Living in London on a student budget is getting more difficult, but services like TOTUM are genuinely life changing! I feel that students should really make use of the wide range of products and services offered to save up a consistent amount of money."',
      author: 'Luce Biscardi',
      role: 'Second year undergrad student',
      avatar: 'LB'
    },
    {
      title: 'Helps student save',
      text: '"I think TOTUM is great and provides quick access to discounts that helps students save when they\'re already struggling."',
      author: 'Rasane Rajib',
      role: 'Foundation year student',
      avatar: 'RR'
    },
    {
      title: 'Love TOTUM',
      text: '"Love, Love, LOVE TOTUM. They have helped me out on so many different occasions. Their discount codes and blogs are super encompassing. I totally see their attempts to help us thrive."',
      author: 'Natasha Chapman',
      role: 'Third year undergrad student',
      avatar: 'NC'
    }
  ];

  const testimonials3Col = [
    {
      text: '"I\'ve saved over £300 this year on everyday purchases. The discounts are incredible and so easy to use!"',
      author: 'Sarah Mitchell',
      role: 'University Student'
    },
    {
      text: '"As an NHS nurse, every penny counts. TOTUM has helped me save on everything from groceries to tech."',
      author: 'James Chen',
      role: 'NHS Staff'
    },
    {
      text: '"The professional membership is worth every penny. I use it daily and the savings add up fast!"',
      author: 'Emily Roberts',
      role: 'Trade Union Member'
    }
  ];

  return (
    <div className="why-totum-section">
      {/* Header */}
      <div className="section-header flex flex-col">
        <h2>Why TOTUM?</h2>
        <p>
          We're top-rated for a reason, and totally committed to bringing you the most exclusive
          deals you won't get anywhere else, straight from your favourite brands. Get all of these
          perks and more...
        </p>
      </div>

      {/* Benefits Grid */}
      {/* <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-icon">{benefit.icon}</div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div> */}

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section - 4 Column Layout */}
      {/* <div className="testimonials-header">
        <h2>What Our Members Say</h2>
        <p>Real savings from real people</p>
      </div> */}

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <h3 className="testimonial-title">{testimonial.title}</h3>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <div className="author-avatar">{testimonial.avatar}</div>
              <div className="author-info">
                <div className="author-name">{testimonial.author}</div>
                <div className="author-role">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alternative: 3 Column Testimonials Layout */}
      {/* <div style={{ marginTop: '80px' }}>
        <div className="testimonials-header">
          <h2>What Our Members Say</h2>
          <p>Real savings from real people</p>
        </div>

        <div className="testimonials-grid-alt">
          {testimonials3Col.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default WhyTotum;
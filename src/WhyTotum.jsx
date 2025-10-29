import React, {useRef, useState, useEffect} from 'react';
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

  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const statsRef = useRef(null);

  const stats = [
    { number: '£2.4M', label: 'Saved This Month', value: 2.4, suffix: 'M', prefix: '£' },
    { number: '4,000+', label: 'Retailers', value: 4000, suffix: '+', prefix: '' },
    { number: '£243', label: 'Avg. Cashback/Year', value: 243, suffix: '', prefix: '£' },
    { number: '1M+', label: 'Active Members', value: 1, suffix: 'M+', prefix: '' }
  ];

  // Intersection Observer to detect when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: '0px'
      }
    );

    const currentRef = statsRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Remove isVisible from dependencies

  // Animate counters when visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const timers = [];

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = increment * currentStep;

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.min(newValue, stat.value);
          return newCounters;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      timers.push(timer);
    });

    // Cleanup function
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [isVisible]); // Only depend on isVisible

  const formatNumber = (value, stat) => {
    const { prefix, suffix } = stat;
    
    // Format the number based on suffix type
    let formattedValue = '';
    
    if (suffix === 'M' || suffix === 'M+') {
      formattedValue = value.toFixed(1);
    } else if (suffix === '+') {
      formattedValue = Math.floor(value).toLocaleString();
    } else {
      formattedValue = Math.floor(value).toLocaleString();
    }

    return `${prefix}${formattedValue}${suffix}`;
  };

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

      {/* Stats Section */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">
                {isVisible ? formatNumber(counters[index], stat) : `${stat.prefix}0${stat.suffix}`}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section - 4 Column Layout */}
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
    </div>
  );
};

export default WhyTotum;
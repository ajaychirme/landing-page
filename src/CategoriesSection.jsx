import React from 'react';

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      title: 'TRENDING OFFERS',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, #c93f9e 0%, #ff4d8f 100%)',
      hasButton: true
    },
    {
      id: 2,
      title: 'BEAUTY',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, #ff4d8f 0%, #ff6ba9 100%)',
      hasButton: true
    },
    {
      id: 3,
      title: 'FASHION',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, #db00ff 0%, #c93f9e 100%)',
      hasButton: true
    },
    {
      id: 4,
      title: 'TECH & MOBILE',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
      gradient: 'linear-gradient(135deg, #7b3fb8 0%, #c93f9e 100%)',
      hasButton: true
    }
  ];

  return (
    <div className="categories-wrapper">
      <style>{`
        .categories-wrapper {
          max-width: 1400px;
          margin: 60px auto;
          padding: 0 20px;
        }

        .categories-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding: 0 10px;
        }

        .categories-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: -0.5px;
          position: relative;
          display: inline-block;
        }

        .categories-title::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #c93f9e, #ff4d8f);
          border-radius: 2px;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 32px;
          background: linear-gradient(135deg, #c93f9e, #ff4d8f);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(201, 63, 158, 0.3);
        }

        .view-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(201, 63, 158, 0.4);
        }

        .view-all-btn .arrow {
          transition: transform 0.3s ease;
        }

        .view-all-btn:hover .arrow {
          transform: translateX(4px);
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .category-card {
          position: relative;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(201, 63, 158, 0.25);
        }

        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .category-card:hover .category-image {
          transform: scale(1.1);
        }

        .category-overlay {
          position: absolute;
          align-items: center;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 32px;
          transition: all 0.4s ease;
        }

        .category-card:hover .category-overlay {
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%);
        }

        .category-icon {
          width: 60px;
          height: 60px;
          margin-bottom: 16px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .category-card:hover .category-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .category-name {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.5px;
        }

        .category-cta {
          padding: 12px 28px;
          background: white;
          color: #c93f9e;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          align-self: center;
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
        }

        .category-cta:hover {
          background: #ff4d8f;
          color: white;
          transform: translateY(-2px);
        }

        .trending-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ff4d8f, #c93f9e);
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 16px rgba(201, 63, 158, 0.4);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .shimmer-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .category-card:hover .shimmer-effect {
          left: 100%;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .categories-title {
            font-size: 2rem;
          }

          .categories-header {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }

          .categories-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .category-card {
            height: 380px;
          }

          .category-name {
            font-size: 1.5rem;
          }

          .view-all-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .categories-title {
            font-size: 1.75rem;
          }

          .category-card {
            height: 320px;
          }

          .category-overlay {
            padding: 24px;
          }

          .category-icon {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .category-name {
            font-size: 1.3rem;
          }
        }
      `}</style>

      <div className="categories-header">
      <div>
            <div className="featured-header">CATEGORIES</div>
          </div>
        <button className="view-all-btn">
          View all
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img 
              src={category.image} 
              alt={category.title} 
              className="category-image"
            />
            <div className="shimmer-effect"></div>
            
            {category.id === 1 && (
              <div className="trending-badge">🔥 Hot</div>
            )}

            <div className="category-overlay">
              <h3 className="category-name">{category.title}</h3>
              {category.hasButton && (
                <button className="category-cta">View Offers</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
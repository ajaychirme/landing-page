import React from 'react';
import { Sparkles } from 'lucide-react';

const StudentDiscountPage = () => {
  const deals = [
    {
      logo: 'schuh',
      title: 'Up to 60% off selected lines + EXTRA 10%',
      brand: 'schuh',
      bgColor: 'bg-black'
    },
    {
      logo: 'CO-OP',
      title: '10% Student Discount via Uber Eats',
      brand: 'Central Co-op',
      bgColor: 'bg-white',
      textColor: 'text-gray-700'
    },
    {
      logo: 'Prime',
      title: '6 months free Prime for Students',
      brand: 'Amazon',
      bgColor: 'bg-white',
      textColor: 'text-gray-700'
    },
    {
      logo: "Millie's",
      title: "20% Student Discount",
      brand: "Millie's Cookies",
      bgColor: 'bg-white',
      textColor: 'text-gray-700'
    },
    {
      logo: 'SD',
      title: '10% Student Discount*',
      brand: 'Superdrug',
      bgColor: 'bg-white',
      textColor: 'text-gray-700'
    }
  ];

  const promoCards = [
    {
      title: 'Treat yourself & save',
      gradient: 'from-orange-400 via-orange-500 to-orange-600',
      items: ['beauty', 'fashion', 'accessories']
    },
    {
      title: 'Winter style sale',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      items: ['coats', 'boots', 'accessories']
    },
    {
      title: "Festive 'fit deals",
      gradient: 'from-orange-400 via-orange-500 to-red-500',
      items: ['party', 'style', 'gifts']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-600 via-pink-500 to-pink-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            The best student discounts from<br />your favourite shops
          </h1>
          <p className="text-lg md:text-xl text-pink-100 font-light">
            Your new favourite student discount website with deals you won't find anywhere else
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Deals of the Day */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Student deals of the day
              </h2>
              
              <div className="space-y-6">
                {deals.map((deal, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0"
                  >
                    <div className={`${deal.bgColor} ${deal.textColor || 'text-white'} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-md`}>
                      {deal.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 text-base">
                        {deal.title}
                      </h3>
                      <p className="text-sm text-gray-500">{deal.brand}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Promo Cards */}
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
            {promoCards.map((card, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Image Section with Gradient */}
                  <div className={`relative h-64 bg-gradient-to-br ${card.gradient} p-6 overflow-hidden`}>
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-16 h-16 bg-pink-400 rounded-lg transform rotate-12"></div>
                      <div className="absolute top-8 right-8 w-20 h-20 bg-blue-500 rounded-lg transform -rotate-6"></div>
                      <div className="absolute bottom-12 left-1/4 w-12 h-12 bg-yellow-400 rounded-lg transform rotate-45"></div>
                    </div>
                    
                    {/* Product Icons */}
                    <div className="relative z-10 flex flex-wrap gap-3 justify-center items-center h-full">
                      <div className="w-16 h-16 bg-white/90 rounded-lg shadow-lg"></div>
                      <div className="w-20 h-20 bg-white/80 rounded-lg shadow-lg"></div>
                      <div className="w-14 h-14 bg-white/90 rounded-lg shadow-lg"></div>
                      <Sparkles className="absolute top-4 right-4 text-yellow-300 w-6 h-6" />
                      <Sparkles className="absolute bottom-8 left-6 text-white w-5 h-5" />
                    </div>

                    {/* Stamp Elements */}
                    <div className="absolute top-2 left-2 bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded transform -rotate-3">
                      SALE
                    </div>
                    <div className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded transform rotate-6">
                      NEW
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {card.title}
                    </h3>
                    <button className="text-purple-400 font-medium hover:text-purple-600 transition-colors">
                      Discover Deals →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDiscountPage;
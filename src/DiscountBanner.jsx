import React from 'react';
import { Star, Sparkles, ArrowRight } from 'lucide-react';

const DiscountBanner = () => {
  const deals = [
    {
      logo: "adidas",
      title: "25% Student Discount",
      brand: "adidas",
      bgColor: "bg-white"
    },
    {
      logo: "wagamama",
      title: "20% Student Discount",
      brand: "wagamama",
      bgColor: "bg-white"
    },
    {
      logo: "hyperoptic",
      title: "Fast Fibre Broadband from £15 a month",
      brand: "Hyperoptic",
      bgColor: "bg-white"
    },
    {
      logo: "mixr",
      title: "Up to 30% off selected products at selected",
      brand: "MiXR",
      bgColor: "bg-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Decorative stars and sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Star className="absolute top-20 left-10 text-white/20 w-6 h-6 animate-pulse" style={{animationDelay: '0s'}} />
        <Star className="absolute top-40 right-20 text-white/30 w-4 h-4 animate-pulse" style={{animationDelay: '1s'}} />
        <Sparkles className="absolute top-60 left-1/4 text-white/20 w-8 h-8 animate-pulse" style={{animationDelay: '0.5s'}} />
        <Star className="absolute bottom-40 right-1/3 text-white/25 w-5 h-5 animate-pulse" style={{animationDelay: '1.5s'}} />
        <Sparkles className="absolute bottom-60 left-1/3 text-white/15 w-6 h-6 animate-pulse" style={{animationDelay: '2s'}} />
        <Star className="absolute top-1/3 right-10 text-white/20 w-7 h-7 animate-pulse" style={{animationDelay: '0.8s'}} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            The UK's No.1 Discount Card for All
          </h1>
          <p className="text-xl text-white/90">
            Your new favourite student discount website with deals you won't find anywhere else
          </p>
        </div>

        {/* Cards Container */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Card - Student Deals */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Student deals of the day</h2>
            
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    {deal.logo === 'adidas' && <div className="text-2xl font-bold">▲</div>}
                    {deal.logo === 'wagamama' && <div className="text-2xl font-bold text-red-600">W</div>}
                    {deal.logo === 'hyperoptic' && <div className="text-sm font-bold text-blue-600">H</div>}
                    {deal.logo === 'mixr' && <div className="text-2xl font-bold text-purple-600">M</div>}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{deal.title}</p>
                    <p className="text-sm text-gray-600">{deal.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Card - Halloween Deals */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex-1 flex items-center justify-center">
                <div className="text-6xl mb-4">🎃</div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-4">No tricks, just Halloween deals</h2>
                <button className="flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Discover More <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Card - Food & Drink */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop" 
                alt="Gourmet burger"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            
            <div className="relative z-10 h-full flex flex-col justify-end">
              <h2 className="text-3xl font-bold mb-4">Save more on food & drink</h2>
              <button className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors w-fit">
                Discover More <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
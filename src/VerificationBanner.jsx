import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

const VerificationBanner = () => {
  return (
    <div className="w-full py-8 px-4">
      <div className="max-w-81rem mx-auto">
        {/* Banner Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-1">
          {/* Inner Content */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-center">
            
            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[2.5rem] font-black text-white mb-6 leading-tight">
             The number 1 student discount site
            </h2>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Enjoy thousands of dreamy deals on our top-rated website. Whether you’re at home or on the go, get instant discounts for your fave brands right here.
            </p>
            
            {/* Buttons Stack */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA Button */}
              <button className="group relative w-full sm:w-auto px-10 py-4 bg-white rounded-full font-bold text-lg text-purple-600 hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
                <span className="flex items-center justify-center space-x-2">
                  <CheckCircle size={22} />
                  <span>VERIFY NOW</span>
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              {/* Secondary Button */}
              <button className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-white rounded-full font-bold text-lg text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                HOW DOES IT WORK?
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationBanner;
import React from 'react';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const VerificationBanner1= () => {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-81rem mx-auto">
        {/* Outer Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-black p-12 sm:p-8 shadow-2xl">

          {/* Decorative Glows */}
          <div className="absolute top-8 left-8 w-20 h-20 bg-pink-400 rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="absolute top-12 right-12 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-8 left-1/4 w-24 h-24 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Promo Badge */}
          <div className="relative flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-300 rounded-full transform -rotate-2 shadow-xl">
              <Sparkles className="text-black" size={20} />
              <span className="text-sm font-black text-black tracking-wider">
                BLACK FRIDAY SPECIAL
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative text-center">
            {/* Heading (from VerificationBanner) */}
            <h2 className="text-4xl sm:text-5xl lg:text-[2.5rem] font-black text-yellow-300 mb-6 leading-tight">
              The number 1 student discount site
            </h2>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              Enjoy thousands of dreamy deals on our top-rated website. Whether you’re at home or on the go, get instant discounts for your fave brands right here.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              
              {/* Primary Button */}
              <button className="group relative w-full sm:w-auto px-12 py-5 bg-yellow-300 rounded-full font-black text-lg text-black hover:bg-yellow-200 transition-all duration-300 hover:scale-110 shadow-2xl hover:shadow-yellow-300/50 transform hover:-rotate-1">
                <span className="flex items-center justify-center space-x-3">
                  <CheckCircle size={24} />
                  <span>VERIFY NOW</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              {/* Secondary Button */}
              <button className="w-full sm:w-auto px-12 py-5 bg-transparent border-4 border-white rounded-full font-black text-lg text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 transform hover:rotate-1">
                HOW DOES IT WORK?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationBanner1;

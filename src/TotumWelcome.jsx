import React from "react";
import "./TotumWelcome.css";

export default function TotumWelcome() {
  return (
    <div className="min-h-[35vh] flex items-center justify-center px-4 py-8 bg-clr">
      <div className="w-full max-w-4xl text-center">
        {/* Main Heading - Slightly Rotated */}
        <div
          className="inline-block mb-4 md:mb-5"
          style={{ transform: "rotate(-1deg)" }}
        >
          <div
            className="bg-black px-4 sm:px-6 md:px-10 lg:px-14 py-2 sm:py-3 lg:py-4"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
              backgroundColor: "#000000",
            }}
          >
            <h1
              className="
        text-white 
        text-xl sm:text-3xl md:text-4xl lg:text-5xl 
        font-black 
        leading-tight sm:leading-snug md:leading-snug lg:leading-[1.2]
        tracking-wide 
        break-words 
        inline-flex 
        futura-bold-oblique
      "
            >
              WELCOME TO TOTUM!
            </h1>
          </div>
        </div>

        {/* Subheading */}
        <p className="text-white text-base md:text-xl lg:text-2xl font-light mb-5 md:mb-7 px-4 futura-medium-23">
          Step into a world of discounts, cashback, ID and loads more...
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center items-center px-4">
          <button
            className="
    w-[200px] h-[55px]
    flex items-center justify-center
    whitespace-nowrap
    bg-white text-pink-600 font-bold rounded-lg
    hover:bg-pink-50 shadow-2xl hover:scale-105 transition-all duration-300
  "
          >
            LOG IN
          </button>

          <button
            className="
    w-[200px] h-[55px]
    flex items-center justify-center
    whitespace-nowrap
    bg-transparent text-white border-4 border-white font-bold rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300
  "
          >
            SIGN UP TODAY
          </button>
        </div>
      </div>
    </div>
  );
}

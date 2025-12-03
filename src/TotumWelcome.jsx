import React from "react";

export default function TotumWelcome() {
  return (
    <div className="min-h-[35vh] bg-pink-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl text-center">
        {/* Main Heading - Slightly Rotated */}
        <div
          className="inline-block mb-4 md:mb-5"
          style={{ transform: "rotate(-1deg)" }}
        >
          <div
            className="bg-black px-6 md:px-12 lg:px-14 py-2 md:py-3 lg:py-4"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
              backgroundColor: "#000000",
            }}
          >
            <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-black tracking-wide">
              WELCOME TO TOTUM!
            </h1>
          </div>
        </div>

        {/* Subheading */}
        <p className="text-white text-base md:text-xl lg:text-2xl font-light mb-5 md:mb-7 px-4">
          Step into a world of discounts, cashback, ID and loads more...
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-5 justify-center items-center px-4">
          <button className="bg-white text-pink-600 font-bold text-base md:text-lg lg:text-xl px-8 md:px-12 lg:px-14 py-2 md:py-3 min-w-[290px] rounded-lg">
  LOG IN
</button>
<button className="bg-transparent text-white font-bold text-base md:text-lg lg:text-xl px-8 md:px-12 lg:px-14 py-2 md:py-3 border-4 border-white min-w-[180px] rounded-lg">
  SIGN UP TODAY
</button>

        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function TotumBenefitsHeader() {
  const [activeTab, setActiveTab] = useState("STUDENT");

  const tabs = [
    {
      id: "STUDENT",
      label: "STUDENT",
      outerBg: "bg-pink-500",
      innerBg: "bg-white",
      textColor: "text-pink-500",
      innerBorder: "border-2 border-black",
    },
    {
      id: "PROFESSIONAL",
      label: "PROFESSIONAL",
      outerBg: "bg-blue-950",
      innerBg: "bg-pink-500",
      textColor: "text-white",
      innerBorder: "border-2 border-white-500",
      rotation: "rotate(1.5deg)",
    },
    {
      id: "APPRENTICE",
      label: "APPRENTICE",
      outerBg: "bg-purple-300",
      innerBg: "bg-blue-950",
      textColor: "text-white",
      innerBorder: "border-2 border-white-950",
      rotation: "rotate(1.5deg)",
    },
    {
      id: "PUBLIC_SECTOR",
      label: "PUBLIC SECTOR",
      outerBg: "bg-white",
      innerBg: "bg-purple-900",
      textColor: "text-white",
      innerBorder: "border-2 border-black",
      rotation: "rotate(1.5deg)",
    },
  ];

  return (
    <div className="bg-gray-100 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 md:mb-8">
          <div
            className="inline-block mb-4"
            style={{ transform: "rotate(-1deg)" }}
          >
            <div className="bg-black px-8 md:px-16 py-3 md:py-4">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-black tracking-wide">
                YOUR TOTUM+ BENEFITS
              </h2>
            </div>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Choose your community and see what TOTUM can do for you...
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative rounded-2xl shadow-xl 
                hover:shadow-2xl hover:scale-105 transition-all duration-300
                ${tab.outerBg}
                p-4 md:p-0
                w-full sm:w-[180px] md:w-[230px]
                h-auto md:h-[105px]
                flex items-center justify-center
              `}
            >
              <div
                className={`
                  ${tab.innerBg} ${tab.innerBorder}
                  px-4 py-2.5 md:py-3
                  w-full md:w-[200px]
                  text-center
                `}
                style={{ transform: "rotate(-1.1deg)" }}
              >
                <span
                  className={`font-black text-[11px] sm:text-xs md:text-sm tracking-wide ${tab.textColor}`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

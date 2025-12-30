import React, { useState } from "react";
import "./TotumBenefits.css";
import TiltedHeader from "./TitledHeader";
export default function TotumBenefitsHeader() {
  const [activeTab, setActiveTab] = useState("STUDENT");

  const tabs = [
    {
      id: "STUDENT",
      label: "STUDENT",
      outerBg: "bg-[#db1f89]", // 🔥 Student Pink
      innerBg: "bg-white",
      textColor: "text-[#db1f89]",
      innerBorder: "border-2 border-black",
    },
    {
      id: "PROFESSIONAL",
      label: "PROFESSIONAL",
      outerBg: "bg-[#072553]", // 🔵 Deep Navy Blue
      innerBg: "bg-[#db1f89]", // Using TOTUM pink for inner
      textColor: "text-white",
      innerBorder: "border-2 border-white",
    },
    {
      id: "APPRENTICE",
      label: "APPRENTICE",
      outerBg: "bg-[#d5b9f3]", // 🟣 Light Lavender
      innerBg: "bg-[#072553]", // Deep navy inside
      textColor: "text-white",
      innerBorder: "border-2 border-white",
    },
    {
      id: "PUBLIC_SECTOR",
      label: "PUBLIC SECTOR",
      outerBg: "bg-white",
      innerBg: "bg-[#7d2369]",
      textColor: "text-white",
      innerBorder: "border-2 border-black",
    },
  ];

  return (
    <div className="bg-gray-100 py-8 md:py-12 px-4 mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-6 md:mb-8">
          <TiltedHeader
            text="YOUR TOTUM+ BENEFITS"
            className="futura-bold-oblique-benefits"
          />

          <p className="text-black-700 text-sm md:text-base">
            Choose your community and see what TOTUM can do for you...
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative rounded-2xl shadow-xl 
                hover:shadow-2xl hover:scale-105 transition-all duration-300
                ${tab.outerBg}
                p-5 md:p-6
                flex items-center justify-center
              `}
            >
              <div
                className={`
                  ${tab.innerBg} ${tab.innerBorder}
                  px-4 py-2.5
                  w-full
                  text-center
                `}
                style={{ transform: "rotate(-1deg)" }}
              >
                <span
                  className={`font-black text-sm md:text-base tracking-wide ${tab.textColor} totum-benetits`}
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

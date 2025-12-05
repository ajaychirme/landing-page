import React from "react";
import checkIcon from "../src/assets/blutick.png";
import blueIcon from "../src/assets/mainblue.png";
import "./WhoCanJoinNew.css";
import { transform } from "framer-motion";
import TiltedHeader from "./TitledHeader";

export default function TotumEligibility() {
  const eligibilityCards = [
    {
      id: "students",
      title: "STUDENTS",
      bgColor: "bg-[#db1f89]",
      titleBg: "bg-white",
      titleText: "text-[#db1f89]",
      titleBorder: "border-2 border-black",
      items: [
        "Sixth form/college students aged 16+",
        "University students aged 16+",
        "Recent graduates",
        "Part-time students",
      ],
    },
    {
      id: "professionals",
      title: "PROFESSIONALS",
      bgColor: "bg-[#072553]",
      titleBg: "bg-[#db1f89]",
      titleText: "text-white",
      titleBorder: "border-2 border-white",
      items: [
        "Trade union members",
        "Academic & support staff",
        "Professional body members",
        "Part-time learners",
      ],
    },
    {
      id: "apprentices",
      title: "APPRENTICES",
      bgColor: "bg-[#d5b9f3]",
      titleBg: "bg-[#072553]",
      titleText: "text-white",
      titleBorder: "border-2 border-white",
      items: [
        "Intermediate (Level 2)",
        "Advanced (Level 3)",
        "Higher (Level 4/5)",
        "Degree Apprenticeship (Level 6/7)",
      ],
    },
    {
      id: "public-sector",
      title: "PUBLIC SECTOR",
      bgColor: "bg-white",
      titleBg: "bg-[#7d2369]",
      titleText: "text-white",
      titleBorder: "border-2 border-black",
      items: [
        "NHS staff",
        "Government employees",
        ".gov.uk email holders",
        "Royal society members",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <TiltedHeader
            text="WHO CAN JOIN TOTUM?"
            className="futura-bold-oblique-whocanjoin"
          />

          <p className="text-black-700 text-sm md:text-base">
            More people are eligible than you think - see if you qualify...
          </p>
        </div>

        {/* Eligibility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-10">
          {eligibilityCards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgColor} rounded-2xl p-5 md:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
            >
              {/* Card Title */}
              <div
                className={`${card.titleBg} ${card.titleBorder} px-4 py-2.5 mb-5 md:mb-6`}
                style={{ transform: "rotate(-1deg)" }}
              >
                <h3
                  className={`${card.titleText} font-black text-sm md:text-base text-center tracking-wide join-totum`}
                >
                  {card.title}
                </h3>
              </div>

              {/* Checklist Items */}
              {/* Checklist Items */}
              <div className="space-y-3 md:space-y-4">
                {card.items.map((item, index) => {
                  const isStudent = card.id === "students";
                  const isDarkText =
                    card.id === "apprentices" || card.id === "public-sector";

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 min-h-[32px]" // ⭐ Vertically centered
                    >
                      {/* Icon */}
                      <img
                        src={isStudent ? blueIcon : checkIcon}
                        alt="check"
                        width="25px"
                        height="25px"
                      />

                      {/* Text */}
                      <span
                        className={`
            ${isDarkText ? "text-black" : "text-white"}
            text-xs md:text-sm
            font-medium leading-snug
            pt-[1px]                      // ⭐ Helps multiline alignment
            flex-1
          `}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* CHECK MY ELIGIBILITY */}
          <button
            className="
      w-[230px] h-[60px]
      bg-transparent text-[#db1f89] font-black
      border-4 border-[#db1f89] rounded-lg
      hover:bg-pink-50  hover:shadow-2xl hover:scale-105 transition-all duration-300
      flex items-center justify-center 
    "
          >
            <span className="whitespace-nowrap truncate">
              CHECK MY ELIGIBILITY
            </span>
          </button>

          {/* SIGN UP TODAY */}
          <button
            className="
      w-[230px] h-[60px]
      bg-[#db1f89] text-white font-black
      rounded-lg
      hover:bg-pink-600
      flex items-center justify-center
      hover:shadow-2xl hover:scale-105 transition-all duration-300
    "
          >
            <span className="whitespace-nowrap truncate">SIGN UP TODAY</span>
          </button>
        </div>
      </div>
    </div>
  );
}

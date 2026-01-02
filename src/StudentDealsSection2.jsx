import React from "react";

const StudentDealsSection2 = ({ isLoggedIn }) => {
  const deals = [
    {
      title: "£10 FOR 80GB - UNLIMITED SOCIAL MEDIA + 1ST MONTH FREE",
      subtitle: "adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      title: "FIND YOUR PERFECT SOMEWHERE WITH 10% OFF HOTELS AT HOTELS.COM",
      subtitle: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      title: "SAVE ON MAC AND IPAD FOR UNI",
      subtitle: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      title:
        "SAVE UP TO £400 ON YOUR NEXT EASYJET HOLIDAY (MINIMUM SPEND APPLIES)",
      subtitle: "ZARA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
  ];

  return (
    <div className="relative">
      {/* HERO */}
      <section
        className="
  text-white
  pt-3 sm:pt-6 md:pt-8
  pb-0
  px-4 sm:px-6 md:px-8
  relative overflow-hidden
  min-h-[17rem] max-[767px]:min-h-[12rem] md:h-[27rem]
"
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-xl sm:text-2xl md:text-[2.5rem] lg:text-[2.5rem] font-extrabold leading-tight mb-[1.5rem]">
            The UK's No. 1 Discount Card for Students, Professionals &
            Apprentices
          </h1>
          <p className="text-xs sm:text-sm md:text-lg opacity-95">
            Exclusive student discounts, professional offers and apprentice
            deals. Plus free cashback, ID and international offers from +500
            brands. All in one app.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <div className="relative md:absolute md:top-72 left-0 right-0 px-3 sm:px-6 md:px-8 pb-10 md:pb-12 z-20">
        {isLoggedIn && (
          <div
            className="flex flex-col lg:flex-row justify-center items-stretch gap-4 max-w-7xl mx-auto mt-2 md:-mt-[3.3rem]"
            style={{ minHeight: "16.5rem" }}
          >
            {/* Student Deals of the Day */}
            <div
              className="bg-white text-gray-900 p-4 shadow-lg flex flex-col w-full lg:w-auto"
              style={{ flexBasis: "40%", borderRadius: "9px" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow">
                {deals.map((deal, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 border border-gray-200 p-3 hover:shadow-sm hover:border-pink-300 transition-all cursor-pointer rounded-lg"
                  >
                    <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-md">
  <img src={deal.logo} className="w-7 h-7 object-contain" />
</div>


                    <p className="font-bold text-xs leading-tight break-words whitespace-normal">
                      {deal.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 1 */}
            <div
              //className="bg-white shadow-lg overflow-hidden flex flex-col w-full sm:w-[48%] lg:w-auto"
              className="bg-white shadow-lg overflow-hidden flex flex-col w-full lg:w-auto mt-10 lg:mt-0"
              style={{
                minHeight: "16.5rem",
                flexBasis: "20%",
                borderRadius: "9px",
              }}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-gray-900 flex-grow">
                  Save more on food & drink
                </h3>
                <a
                  href="/discount-more"
                  className="text-pink-600 font-semibold text-sm mt-2"
                >
                  Discover More →
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div
              //className="bg-white shadow-lg overflow-hidden flex flex-col w-full sm:w-[48%] lg:w-auto"
              className="bg-white shadow-lg overflow-hidden flex flex-col w-full lg:w-auto mt-4 lg:mt-0"
              style={{
                minHeight: "16.5rem",
                flexBasis: "20%",
                borderRadius: "9px",
              }}
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=600&q=80"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-gray-900 flex-grow">
                  No tricks, just Halloween deals
                </h3>
                <a
                  href="/discount-more"
                  className="text-pink-600 font-semibold text-sm mt-2"
                >
                  Discover More →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDealsSection2;

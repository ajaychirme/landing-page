import React, { useEffect, useState } from "react";

const StudentDealsSection = ({isLoggedIn}) => {
  const userTypes = ["student","professional","apprentice","publicsector"];
  const [selectedType, setSelectedType] = useState("student")

  const deals = [
    {
      title: "25% Student Discount",
      subtitle: "adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      title: "20% Student Discount",
      subtitle: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    ,
    {
      title: "20% Student Discount",
      subtitle: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      title: "Flat 15% Off on Fashion",
      subtitle: "ZARA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
    {
      title: "Up to 30% off on Electronics",
      subtitle: "Samsung",
      logo: "data:image/png;base64,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",
    },
    ,
    {
      title: "Up to 30% off on Electronics",
      subtitle: "Samsung",
      logo: "data:image/png;base64,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",
    },
  ];

  const handleClick = () => {
  setSelectedType((prevType) => {
    const currentIndex = userTypes.indexOf(prevType);
    const nextIndex = (currentIndex + 1) % userTypes.length;
    return userTypes[nextIndex];
  });
};

  useEffect(()=>{console.log('hii',selectedType)},[selectedType])
  
  return (


    <div className="relative"
    style={{marginTop:"20rem"}}
    onClick={handleClick}>
      {/* Extended Gradient Background Section */}
      {!isLoggedIn && <section
  className="
    text-white
    pt-12 sm:pt-16 md:pt-12
    pb-12 sm:pb-12 md:pb-8
    px-4 sm:px-6 md:px-8
    relative overflow-hidden
  "
style={{
  height: "28rem",
           backgroundColor:
  selectedType === "student"
    ? "#db1f89"
    : selectedType === "professional"
    ? "#072553"
    : selectedType === "apprentice"
    ? "#000"
    : "#7d2369",

  backgroundImage: "url('/bg1.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}


>
  {/* Decorative Background Elements */}
  <div className="hidden md:block absolute top-10 left-20 w-32 h-32 rounded-full opacity-10 bg-white blur-3xl"></div>
  <div className="hidden md:block absolute top-40 right-32 w-24 h-24 rounded-full opacity-10 bg-white blur-2xl"></div>
  <div className="hidden lg:block absolute bottom-20 left-1/4 w-40 h-40 rounded-full opacity-10 bg-white blur-3xl"></div>

  {/* Heading Section */}
  <div className={`text-center max-w-4xl mx-auto relative z-10 py-4 sm:py-6 ${
    isLoggedIn ? "loggedIn-header" : ""
  }`}
    style={{backgroundColor:
  selectedType === "student"
    ? "#db1f89"
    : selectedType === "professional"
    ? "#072553"
    : selectedType === "apprentice"
    ? "#000"
    : "#7d2369",}}
  >
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 sm:mb-4 px-2">
      The UK’s No. 1 Discount Card for Students, Professionals & Apprentices updated
    </h1>

    <p className="text-sm sm:text-base md:text-lg text-white opacity-95 leading-relaxed px-4 sm:px-6 mt-3 sm:mt-4" style={{marginTop:"1rem"}}>
      Exclusive student discounts, professional offers and apprentice deals. Plus free cashback, ID and international offers from +500 brands. All in one app.
    </p>

    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
      <button className="w-full sm:w-auto bg-white text-purple-700 font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
        FIND OUT MORE
      </button>
      <button className="w-full sm:w-auto bg-pink-600 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
        SIGN UP TODAY
      </button>
    </div>
  </div>
</section>}

{isLoggedIn && <section
  className="text-white px-8 relative overflow-hidden"
        style={{
          height: "28rem",
           backgroundColor:
  selectedType === "student"
    ? "#db1f89"
    : selectedType === "professional"
    ? "#072553"
    : selectedType === "apprentice"
    ? "#000"
    : "#7d2369",

  backgroundImage: "url('/bg1.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-20 w-32 h-32 rounded-full opacity-10 bg-white blur-3xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full opacity-10 bg-white blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full opacity-10 bg-white blur-3xl"></div>
  {/* Heading Section */}
  <div className={`text-center max-w-4xl mx-auto relative z-10 py-4 sm:py-6 ${
    isLoggedIn ? "pt-6 sm:pt-6" : ""
  }`}
  style={{backgroundColor:
  selectedType === "student"
    ? "#db1f89"
    : selectedType === "professional"
    ? "#072553"
    : selectedType === "apprentice"
    ? "#000"
    : "#7d2369",}}
  >
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3 sm:mb-4 px-2" style={{fontSize: "2rem"}}>
      The UK’s No. 1 Discount Card for Students, Professionals & Apprentices
    </h1>

    <p className="text-sm sm:text-base md:text-lg text-white opacity-95 leading-relaxed px-4 sm:px-6 mt-3 sm:mt-4" style={{marginTop:"1rem"}}>
      Exclusive student discounts, professional offers and apprentice deals. Plus free cashback, ID and international offers from +500 brands. All in one app1.
    </p>

    {!isLoggedIn && <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
      <button className="w-full sm:w-auto bg-white text-purple-700 font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
        FIND OUT MORE
      </button>
      <button className="w-full sm:w-auto bg-pink-600 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap">
        SIGN UP TODAY
      </button>
    </div>}
  </div>
</section>}


      {/* Cards Section - Positioned absolutely to maintain same position */}
      <div className="absolute top-72 left-0 right-0 px-8 pb-12 z-20">
     { isLoggedIn && (<div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 max-w-7xl mx-auto" style={{maxHeight:"20rem",marginTop: '-6rem'}}>
          {/* Student Deals of the Day */}
          <div
            className="bg-white text-gray-900 p-3 shadow-xl flex flex-col"
            style={{ flexBasis: "40%" , borderRadius: "10px"}}
          >
            <div className="grid grid-cols-2 gap-3 flex-grow">
              {deals.map((deal, index) => (
               <div
  className="flex items-center gap-3 border border-gray-200 p-4 transition-all cursor-pointer hover:shadow-md"
  onMouseEnter={(e) => (e.currentTarget.style.borderColor = { student:"#db1f89", professional:"#072553", apprentice:"#000", publicsector:"#7d2369" }[selectedType])}
  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e5e7eb")}
  style={{borderRadius: "10px"}}
>
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg">
                    <img
                      src={deal.logo}
                      alt={deal.subtitle}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/40x40/c93f9e/ffffff?text=${deal.subtitle.charAt(0)}`;
                      }}
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-bold text-sm leading-tight mb-1">{deal.title}</p>
                    <p className="text-xs text-gray-500">{deal.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

                {/* Card 4 */}
          <div
            className="bg-white shadow-xl overflow-hidden flex flex-col"
            // style={{ height:'20rem', flexBasis: "20%" }}
            style={{flexBasis: "18%"  , borderRadius: "10px"}}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
                alt="Food & drink deals"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex-grow">
                Save more on food & drink
              </h3>
              <a
  href="/discount-more"
  className="font-semibold transition-colors duration-300"
  style={{
    color:
      selectedType === "student"
        ? "#db1f89"
        : selectedType === "professional"
        ? "#072553"
        : selectedType === "apprentice"
        ? "#000"
        : "#7d2369",
  }}
  onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
  onMouseLeave={(e) => (e.target.style.opacity = 1)}
>
  Discover More →
</a>

            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white shadow-xl overflow-hidden flex flex-col"
            // style={{ height: '20rem', flexBasis: "20%" }}
            style={{flexBasis: "18%" , borderRadius: "10px"}}
          >
            <div className="relative h-56 bg-gradient-to-br from-orange-500 to-purple-600 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=600&q=80"
                alt="Halloween deals"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex-grow">
                No tricks, just Halloween deals
              </h3>
             <a
  href="/discount-more"
  className="font-semibold transition-colors duration-300"
  style={{
    color:
      selectedType === "student"
        ? "#db1f89"
        : selectedType === "professional"
        ? "#072553"
        : selectedType === "apprentice"
        ? "#000"
        : "#7d2369",
  }}
  onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
  onMouseLeave={(e) => (e.target.style.opacity = 1)}
>
  Discover More →
</a>

            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white shadow-xl overflow-hidden flex flex-col"
            // style={{ height:'20rem', flexBasis: "20%" }}
            style={{flexBasis: "18%" , borderRadius: "10px" }}
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
                alt="Food & drink deals"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2 flex-grow">
                Save more on food & drink
              </h3>
              <a
  href="/discount-more"
  className="font-semibold transition-colors duration-300"
  style={{
    color:
      selectedType === "student"
        ? "#db1f89"
        : selectedType === "professional"
        ? "#072553"
        : selectedType === "apprentice"
        ? "#000"
        : "#7d2369",
  }}
  onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
  onMouseLeave={(e) => (e.target.style.opacity = 1)}
>
  Discover More →
</a>

            </div>
          </div>

        </div>)}
      </div>
    </div>
  );
};

export default StudentDealsSection;
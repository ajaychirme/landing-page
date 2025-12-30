import React, { useEffect } from "react";
import "./StudentDealsSection1.css";
import { Sparkles } from "lucide-react";

const StudentDealsSection1 = ({ isLoggedIn }) => {
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
    {
      title: "Flat 15% Off on Fashion",
      subtitle: "ZARA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
    {
      title: "Up to 30% off on Electronics",
      subtitle: "Samsung",
      logo:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbMAAAB0CAMAAAA4qSwNAAAAgVBMVEX///8AAADKysrr6+teXl6JiYloaGijo6PT09PAwMDNzc2mpqb39/fGxsZ2dnb8/Pzk5OQoKCgXFxeSkpLd3d27u7ubm5uBgYGysrJOTk5wcHDo6OhTU1OsrKzw8PBERERkZGQgICA1NTUMDAyGhoY7Ozs5OTksLCwaGhpaWlpCQkKe7PDMAAAMjElEQVR4nO1c63bivA4lLRQKoVDutEBhOp228/4PeBpCLG1ZSqDJN3Sto/0LfIujbcuyLKfVcjgcDofD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcDj+z/E/8zKdd1QPWrcAAAAASUVORK5CYII=",
    },
  ];

  useEffect(() => {
    console.log("hii", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="relative">
      {/* Gradient Background Section */}
      {!isLoggedIn && (
        <section
          className="text-white relative overflow-visible bg-black p-12 sm:p-8 shadow-2xl subtle-gradient-bg"
        >
          {/* ✨ Decorative Glows */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-60 animate-pulse z-0" />
          <div
            className="absolute top-0 -right-10 w-56 h-56 bg-yellow-300 rounded-full blur-3xl opacity-50 animate-pulse z-0"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute -bottom-12 left-1/4 w-48 h-48 bg-cyan-400 rounded-full blur-3xl opacity-60 animate-pulse z-0"
            style={{ animationDelay: "2s" }}
          />

          {/* Header Content */}
          <div className="relative text-center z-10 py-8">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-yellow-300 rounded-full transform -rotate-2 shadow-xl mb-6">
              <Sparkles className="text-black" size={20} />
              <span className="text-sm font-black text-black tracking-wider">
                BLACK FRIDAY SPECIAL
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-yellow-300">
              The UK's No.1 Discount Card for All2
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-yellow-100 opacity-95 leading-relaxed px-4 sm:px-6 mt-3">
              Your new favourite student discount website with deals you won't
              find anywhere else.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <button className="w-full sm:w-auto bg-yellow-400 text-black font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-300/40 transform hover:scale-105 text-base whitespace-nowrap">
                FIND OUT MORE
              </button>
              <button className="w-full sm:w-auto bg-transparent border-4 border-yellow-300 text-yellow-300 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 hover:text-black transition-all duration-300 shadow-lg hover:shadow-yellow-300/40 transform hover:scale-105 text-base whitespace-nowrap">
                SIGN UP TODAY
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Logged-in Section */}
      {isLoggedIn && (
        <section
          className="text-white relative overflow-visible bg-black p-12 sm:p-8 shadow-2xl subtle-gradient-bg"
          style={{ height: "26rem" }}
        >
          {/* ✨ Decorative Glows */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-60 animate-pulse z-0" />
          <div
            className="absolute top-0 -right-10 w-56 h-56 bg-yellow-300 rounded-full blur-3xl opacity-50 animate-pulse z-0"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute -bottom-12 left-1/4 w-48 h-48 bg-cyan-400 rounded-full blur-3xl opacity-60 animate-pulse z-0"
            style={{ animationDelay: "2s" }}
          />

          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-yellow-300">
              The UK's No.1 Discount Card for All
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-yellow-100 opacity-95 leading-relaxed px-4 sm:px-6 mt-3">
              Your new favourite student discount website with deals you won't
              find anywhere else.
            </p>
          </div>
        </section>
      )}

      {/* Cards Section */}
      <div className="absolute top-72 left-0 right-0 px-8 pb-12 z-20">
        {isLoggedIn && (
          <div
            className="flex flex-col lg:flex-row justify-center items-stretch gap-6 max-w-7xl mx-auto"
            style={{ marginTop: "-8.5rem" }}
          >
            {/* Deals of the Day */}
            <div
              className="bg-black text-yellow-300 rounded-2xl p-4 shadow-xl flex flex-col border border-yellow-600"
              style={{ height: "20rem", flexBasis: "38%" }}
            >
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">
                Student deals of the day
              </h2>
              <div className="grid grid-cols-2 gap-4 flex-grow">
                {deals.map((deal, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 border border-yellow-700 rounded-xl p-4 hover:shadow-md hover:border-yellow-400 transition-all cursor-pointer bg-gray-950"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-lg">
                      <img
                        src={deal.logo}
                        alt={deal.subtitle}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/40x40/000000/FFD700?text=${deal.subtitle.charAt(
                            0
                          )}`;
                        }}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-sm leading-tight mb-1 text-yellow-300">
                        {deal.title}
                      </p>
                      <p className="text-xs text-yellow-500">
                        {deal.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="bg-black rounded-2xl shadow-xl overflow-hidden flex flex-col border border-yellow-700"
              style={{ height: "20rem", flexBasis: "20%" }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=600&q=80"
                  alt="Halloween deals"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col text-yellow-300">
                <h3 className="text-xl font-bold mb-2 flex-grow">
                  No tricks, just Halloween deals
                </h3>
                <a
                  href="/discount-more"
                  className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
                >
                  Discover More →
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="bg-black rounded-2xl shadow-xl overflow-hidden flex flex-col border border-yellow-700"
              style={{ height: "20rem", flexBasis: "20%" }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
                  alt="Food & drink deals"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col text-yellow-300">
                <h3 className="text-xl font-bold mb-2 flex-grow">
                  Save more on food & drink
                </h3>
                <a
                  href="/discount-more"
                  className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
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

export default StudentDealsSection1;

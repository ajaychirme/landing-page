import React from "react";
import news0 from "./assets/news0.webp";
import news1 from "./assets/news1.webp";
import news2 from "./assets/news2.webp";
import news3 from "./assets/news3.webp";

const LatestNews = () => {
  const articles = [
    {
      id: 1,
      category: "FEATURED",
      title: "WHAT ARE THE HIGHEST PAYING DEGREES IN THE UK?",
      description:
        "With the cost of university so high, one of the most common considerations when choosing a degree nowadays is how much it is likely to earn you in the long run.",
      image: news0,
    },
    {
      id: 2,
      category: "ENTERTAINMENT",
      title: "DO STUDENTS NEED A TV LICENCE?",
      description:
        "If you're about to start or return to university and you've found yourself panicking over whether students need a TV licence - fear not, we're here to help.",
      image: news1,
    },
    {
      id: 3,
      category: "HOME & FINANCE",
      title:
        "STUDENTS AFFECTED BY STRIKES OR THE PANDEMIC COULD CLAIM £5,000 COMPENSATION",
      description:
        "Nearly 20,000 students in the UK have launched a multi-million-pound group legal action against UK universities, over disruption and lost learning due to strikes and the Covid pandemic.",
      image: news2,
    },
    {
      id: 4,
      category: "HOME & FINANCE",
      title: "WHY STUDENT RENTAL PRICES WILL JUST KEEP ON RISING",
      description:
        "A combination of private-equity investment, shortage of supply and resilient demand are causing students to pay out a larger and larger proportion of their finances on rent.",
      image: news3,
    },
  ];

  return (
    <div className="latest-news-section bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="inline-block bg-black text-white px-6 py-2 text-sm font-bold tracking-wider">
            CONTENT HIGHLIGHTS
          </div>
          <a
            href="/view-all"
            className="text-sm font-semibold text-gray-900 hover:text-pink-600 transition-colors flex items-center gap-2"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex-grow">
                  <div className="inline-block bg-pink-100 text-pink-700 px-3 py-1 text-xs font-semibold tracking-wider mb-3 rounded">
                    {article.category}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-pink-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.description}
                  </p>
                </div>

                <button className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-pink-600 transition-colors group/btn self-start">
                  <span className="border-b-2 border-gray-900 group-hover/btn:border-pink-600 pb-1">
                    Read the story
                  </span>
                  <svg
                    className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;

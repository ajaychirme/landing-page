import { useRef, useState, useEffect } from "react";

const WhyTotum = ({isLoggedIn}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const statsRef = useRef(null);

  const stats = [
    { number: "£2.4M", label: "Saved This Month", value: 2.4, suffix: "M", prefix: "£" },
    { number: "4,000+", label: "Retailers", value: 4000, suffix: "+", prefix: "" },
    { number: "£243", label: "Avg. Cashback/Year", value: 243, suffix: "", prefix: "£" },
    { number: "1M+", label: "Active Members", value: 1, suffix: "M+", prefix: "" },
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = statsRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate counters
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const timers = [];

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = increment * currentStep;

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.min(newValue, stat.value);
          return newCounters;
        });

        if (currentStep >= steps) clearInterval(timer);
      }, stepDuration);

      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
    // eslint-disable-next-line
  }, [isVisible]);

  const formatNumber = (value, stat) => {
    const { prefix, suffix } = stat;
    let formattedValue = "";

    if (suffix === "M" || suffix === "M+") {
      formattedValue = value.toFixed(1);
    } else if (suffix === "+") {
      formattedValue = Math.floor(value).toLocaleString();
    } else {
      formattedValue = Math.floor(value).toLocaleString();
    }

    return `${prefix}${formattedValue}${suffix}`;
  };

  const testimonials = [
    {
      title: "By far the best",
      text: '"TOTUM is by far the best student app there is..."',
      author: "Avenoor Gulati",
      role: "First year undergraduate student",
      avatar: "AG",
    },
    {
      title: "Life changing",
      text: '"Living in London on a student budget is getting more difficult..."',
      author: "Luce Biscardi",
      role: "Second year undergrad student",
      avatar: "LB",
    },
    {
      title: "Helps student save",
      text: '"I think TOTUM is great and provides quick access to discounts..."',
      author: "Rasane Rajib",
      role: "Foundation year student",
      avatar: "RR",
    },
    {
      title: "Love TOTUM",
      text: '"Love, Love, LOVE TOTUM..."',
      author: "Natasha Chapman",
      role: "Third year undergrad student",
      avatar: "NC",
    },
  ];

  return (
    <div className="bg-white py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Why TOTUM?
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            We're top-rated for a reason…
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-3xl p-8 md:p-12 mb-16 shadow-xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2">
                  {isVisible ? formatNumber(counters[index], stat) : `${stat.prefix}0${stat.suffix}`}
                </div>
                <div className="text-sm md:text-base text-white/90 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 transition-all duration-300 border border-gray-200 hover:-translate-y-1 hover:border-pink-500 hover:shadow-[0_8px_24px_rgba(236,72,153,0.35)]"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.author}</div>
                  <div className="text-xs text-gray-600">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isLoggedIn && <div className="text-center">
          <a
            href="/sign-up"
            className="bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 inline-block"
          >
            Sign Up Today
          </a>
        </div>}
      </div>
    </div>
  );
};

export default WhyTotum;

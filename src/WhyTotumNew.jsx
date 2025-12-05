import React from 'react';
import starIcon from '../src/assets/mainblue.png';
import quoteIcon from '../src/assets/Quote.png';
import TiltedHeader from './TitledHeader';
import './WhyJoinTotumNew.css'

export default function WhyJoinTotum() {
  const stats = [
    {
      icon: starIcon,
      value: '£2.5 mil',
      description: 'Saved this month'
    },
    {
      icon: starIcon,
      value: '4,000+',
      description: 'Retailers'
    },
    {
      icon: starIcon,
      value: '£243',
      description: 'Average yearly cashback'
    },
    {
      icon: starIcon,
      value: '2.0 mil+',
      description: 'Members'
    }
  ];

  const testimonials = [
    {
      id: 1,
      title: 'Life Changing!',
      quote: '"Living in London on a student budget has been made much easier. With TOTUM I either save or earn cashback every day!',
      author: 'Luca Bascardi - 2nd year student'
    },
    {
      id: 2,
      title: 'Life Changing!',
      quote: '"Living in London on a student budget has been made much easier. With TOTUM I either save or earn cashback every day!',
      author: 'Luca Bascardi - 2nd year student'
    },
    {
      id: 3,
      title: 'Life Changing!',
      quote: '"Living in London on a student budget has been made much easier. With TOTUM I either save or earn cashback every day!',
      author: 'Luca Bascardi - 2nd year student'
    },
    {
      id: 4,
      title: 'Life Changing!',
      quote: '"Living in London on a student budget has been made much easier. With TOTUM I either save or earn cashback every day!',
      author: 'Luca Bascardi - 2nd year student'
    }
  ];

  return (
    <div className="bg-gray-100 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
     <TiltedHeader
  text="WHY JOIN TOTUM?"
  className="futura-bold-oblique-whyjointotum"
/>

          <p className="text-black-700 text-sm md:text-base">
            We're top-rated by our members for a reason...
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-[#db1f89] rounded-3xl p-6 md:p-8 mb-6 md:mb-10 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {/* Star Icon - Replace with actual PNG */}
                  <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black">{stat.value}</h3>
                </div>
                <p className="text-xs md:text-sm font-medium">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br bg-[#6A1B6D]  rounded-2xl p-5 md:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-blue-950 rounded-full flex items-center justify-center shadow-lg">
                <img src={quoteIcon} alt="quote_icon" />
              </div>

              <div className="mt-6 text-white text-center">
                <h3 className="text-lg md:text-xl font-black mb-3">{testimonial.title}</h3>
                <p className="text-xs md:text-sm font-medium leading-relaxed mb-4">
                  {testimonial.quote}
                </p>
                <p className="text-xs font-bold">{testimonial.author}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="bg-[#db1f89] text-white font-black text-base md:text-lg px-12 md:px-16 py-3 md:py-4 hover:bg-pink-600 transition-colors shadow-lg rounded-lg">
            SIGN UP TODAY
          </button>
        </div>
      </div>
    </div>
  );
}
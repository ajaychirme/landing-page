import React from "react";
// import burgerImg from "./assets/burger.jpg"; // example image

export default function DealsSection() {
  const deals = [
    { title: "25% Student Discount", brand: "adidas" },
    { title: "20% Student Discount", brand: "wagamama" },
    { title: "Fast Fibre Broadband from £15 a month", brand: "Hyperoptic" },
    { title: "Up to 30% off selected products", brand: "MiXR" },
  ];

  return (
    <section
      className="text-white py-20 px-8"
      style={{
        background:
          "linear-gradient(135deg, #3d4fb8 0%, #7b3fb8 35%, #c93f9e 70%, #ff4d8f 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          The UK's No.1 Discount Card for All
        </h1>
        <p className="text-lg opacity-90">
          Your new favourite student discount website with deals you won't find
          anywhere else
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Student deals list */}
        <div className="col-span-2 bg-white rounded-3xl shadow-lg p-6 text-black flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Student deals of the day</h2>
          <div className="grid grid-cols-2 gap-4">
            {deals.map((deal, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 p-4 flex flex-col justify-center items-center hover:shadow-md transition-all duration-200"
              >
                <p className="font-semibold text-center">{deal.title}</p>
                <span className="text-sm text-gray-500">{deal.brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image cards */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-white text-black p-6 h-[250px] flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-xl font-bold mb-2">
                No tricks, just Halloween deals
              </h3>
            </div>
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline mt-auto"
            >
              Discover More →
            </a>
          </div>

          <div className="rounded-3xl bg-white text-black overflow-hidden shadow-lg h-[250px] flex flex-col justify-between">
            <img
              src={'https://nomoneynotime.com.au/uploads/recipes/shutterstock_257496871-1.jpg'}
              alt="Food offer"
              className="w-full h-[150px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                Save more on food & drink
              </h3>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Discover More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

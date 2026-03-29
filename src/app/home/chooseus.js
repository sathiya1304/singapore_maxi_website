export default function WhyChooseUs() {
  const features = [
    {
      imgSrc: "/images/choose1.png",
      colorClass: "bg-emerald-50",
      hoverColorClass: "group-hover:bg-emerald-200",
      iconClass: "text-[#FFBF34]",
      highlightedText: "Reliable",
      text: "And Punctual",
      description: "We guarantee on-time pickups every single trip. Your schedule is our priority, so you never have to worry about delays.",
    },
    {
      imgSrc: "/images/choose2.png",
      colorClass: "bg-red-50",
      hoverColorClass: "group-hover:bg-red-200",
      iconClass: "text-[#FFBF34]",
      highlightedText: "Comfortable",
      text: "Rides",
      description: "Sit back and relax in our spacious, well-maintained maxi cabs designed to give you a smooth and enjoyable journey.",
    },
    {
      imgSrc: "/images/choose3.png",
      colorClass: "bg-purple-50",
      hoverColorClass: "group-hover:bg-purple-200",
      iconClass: "text-[#FFBF34]",
      highlightedText: "Experienced",
      text: "Drivers",
      description: "Our professional drivers are trained, licensed, and local experts who know Singapore's roads inside and out.",
    },
    {
      imgSrc: "/images/choose4.png",
      colorClass: "bg-emerald-50",
      hoverColorClass: "group-hover:bg-emerald-200",
      iconClass: "text-[#FFBF34]",
      highlightedText: "Affordable",
      text: "Pricing",
      description: "Get premium maxi cab service at competitive rates with no hidden charges. Transparent pricing for every ride.",
    },
    {
      imgSrc: "/images/choose5.png",
      colorClass: "bg-red-50",
      hoverColorClass: "group-hover:bg-red-200",
      iconClass: "text-[#FFBF34]",
      highlightedText: "24/7",
      text: "Availability",
      description: "Whether it's an early morning flight or a late-night event, we are available round the clock to serve you.",
    },
    {
      imgSrc: "/images/choose6.png",
      colorClass: "bg-purple-50",
      hoverColorClass: "group-hover:bg-purple-200",
      iconClass: "text-[#FFBF34]",
      highlightedText: "Cross-Border",
      text: "Expertise",
      description: "Seamless transfers to Malaysia and beyond. We handle all border formalities so your cross-border trip is stress-free.",
    },
    {
      imgSrc: "/images/choose7.png",
      colorClass: "bg-emerald-50",
      hoverColorClass: "group-hover:bg-emerald-200",
      iconClass: "text-[#FFBF34]",
      highlightedText: "Advanced",
      text: "Booking",
      description: "Plan ahead with our easy advance booking system. Schedule your ride days in advance and travel with complete peace of mind.",
    },
  ];

  return (
    <section className="py-16 px-4" id="choose-us">
      <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-[#E2E2E2] flex flex-col items-center text-center group transition-all duration-300 hover:bg-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-lg ${feature.colorClass} ${feature.hoverColorClass} flex items-center justify-center mb-4 transition-all duration-300`}
              >
                <img
                  src={feature.imgSrc}
                  alt={feature.highlightedText}
                  className="w-6 h-6 transition-transform duration-300 group-hover:rotate-[360deg]"
                />
              </div>
              <h3 className="text-lg font-medium mb-2">
                <span className={feature.iconClass}>
                  {feature.highlightedText}
                </span>{" "}
                {feature.text}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.slice(3).map((feature, index) => (
            <div
              key={index}
              className="px-6 py-10 rounded-lg border border-[#E2E2E2] flex flex-col items-center text-center group transition-all duration-300 hover:bg-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-lg ${feature.colorClass} ${feature.hoverColorClass} flex items-center justify-center mb-4 transition-all duration-500`}
              >
                <img
                  src={feature.imgSrc}
                  alt={feature.highlightedText}
                  className="w-6 h-6 transition-transform duration-500 group-hover:rotate-[360deg] "
                />
              </div>
              <h3 className="text-lg font-medium mb-2">
                <span className={feature.iconClass}>
                  {feature.highlightedText}
                </span>{" "}
                {feature.text}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

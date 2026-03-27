import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const TravelLanding = () => {
  const destinations = [
    "Attraction Tickets Available",
    "Any time, Any date",
    "Skip the Queue",
    "Attractive Price",

  ];

  return (
<div className="min-h-screen bg-[#F6F6F6] p-6 relative overflow-hidden mb-16">
  {/* Decorative circles */}
  <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute top-10 right-20 w-8 h-8 border-2 border-white/20 rounded-full"></div>
  <div className="absolute top-20 right-40 w-4 h-4 border-2 border-white/20 rounded-full"></div>

  {/* Content container */}
  <div className="max-w-5xl mx-auto pt-12">
    {/* Header */}
    <div className="text-center mb-8">
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight max-w-3xl mx-auto">
        Attraction Tickets any Time
        <br />
        and Available all Time
      </h1>
    </div>

    {/* Destinations */}
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {destinations.map((destination) => (
        <div key={destination} className="flex items-center gap-2 bg-[#FFBF34] rounded-full px-4 py-2">
          {/* <Check className="w-4 h-4 text-black" /> */}
          <span className="text-black  border border-[#FFBF34] font-medium">{destination}</span>
        </div>
      ))}
    </div>

    {/* Single Full-Width Image */}
    <div className="relative w-full h-64 sm:h-80 md:h-[650px] px-4">
      <Image
        src="/images/attractive.svg"
        alt="Travel photo"
        className="rounded-lg object-cover"
        fill
      />
    </div>
  </div>
</div>

  );
};

export default TravelLanding;

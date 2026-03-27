import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Wheelchair-Friendly Services",
    description:
      "Our Maxicabs are equipped with ramps to accommodate passengers with mobility needs, ensuring a safe and comfortable ride.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
  {
    title: "Local Rides",
    description:
      "Navigate your city effortlessly with our reliable local rides. Quick pickups and smooth drop-offs at affordable rates. Ride smart, ride local.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
  {
    title: "Airport Transfers",
    description:
      "Say goodbye to airport hassles with timely and comfortable transfers. Punctuality and convenience, every step of the way. Your flight, our priority.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
  {
    title: "Outstation Trips",
    description:
      "Explore beyond city limits with our seamless outstation trips. Comfortable rides for your journeys, long or short. Adventure awaits, let's drive you there.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
  {
    title: "Subscription & Shared Services",
    description:
      "Affordable and eco-friendly travel options with shared rides. Save more with our subscription plans for daily commuters. Convenient, budget-friendly, and sustainable.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
  {
    title: "Tourist & Sightseeing Package",
    description:
      "Discover scenic spots with curated sightseeing packages. Travel hassle-free with experienced drivers and tailored itineraries. Your memorable journey starts here.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
  {
    title: "Corporate Services",
    description:
      "Professional travel solutions for your business needs. Reliable rides with impeccable service for your team and clients. Elevate your corporate travel experience.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
  {
    title: "Specialized Rides",
    description:
      "Experience tailored rides that cater to your unique needs. From luxury to accessibility, we have it all. Your comfort is our priority.",
    image: "/images/taxi.svg",
    hoverImage: "/images/yellowtaxi.svg", // Add the hover image path
  },
];



export default function TripsManagement() {
  const [showAll, setShowAll] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const updateScreenWidth = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); // Show button for screens less than 1024px (tablet & mobile)
    };
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);

    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  // Determine how many items to display for mobile and tablet views
  const displayedServices =
    showAll || !isMobileOrTablet ? services : services.slice(0, 4);

  return (
    <div
      className=" bg-opacity-90 py-16 px-4"
      id="our-services"
      style={{
        backgroundImage: 'url("/images/trip-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-12">
          Our Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedServices.map((service, index) => (
            <Card
              key={index}
              className="bg-white group overflow-hidden relative"
            >
              <CardHeader>
                <CardTitle className="text-lg sm:text-lg md:text-xl lg:text-xl font-semibold text-center">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-0">
                <p className="text-sm text-gray-600 p-4">
                  {service.description}
                </p>
                <div className="relative h-[130px] overflow-hidden">
                  {/* Default image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute left-[-30%] transition-all duration-500 ease-in-out group-hover:left-[50%] group-hover:translate-x-[-50%] group-hover:filter group-hover:hue-rotate-[50deg]"
                  />
                  {/* Hover image */}
                  <img
                    src={service.hoverImage}
                    alt={service.title}
                    className="absolute left-[-30%] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:left-[50%] group-hover:translate-x-[-50%]"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Show More / Show Less Button */}
        {services.length > 4 && isMobileOrTablet && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 text-black bg-[#FFBF34] rounded-full transition"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
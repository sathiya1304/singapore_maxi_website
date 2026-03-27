import React, { useState, useEffect } from "react";

export default function StatsSection() {
  const [kms, setKms] = useState(0);
  const [drivers, setDrivers] = useState(0);
  const [rides, setRides] = useState(0);
  const [dailyRides, setDailyRides] = useState(0);

  // Function to increment numbers gradually
  const countUp = (start, end, setValue) => {
    let current = start;
    const increment = end / 200; // Slowed down by increasing the denominator
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setValue(Math.floor(current));
    }, 30); // Increased interval to slow down the speed
  };

  useEffect(() => {
    countUp(0, 368887, setKms);
    countUp(0, 368, setDrivers);
    countUp(0, 168887, setRides);
    countUp(0, 1068, setDailyRides);
  }, []);

  return (
    <div
  className="relative bg-cover bg-center bg-no-repeat py-8 px-4 container max-w-7xl mx-auto rounded-lg"
  style={{ backgroundImage: "url('/images/count-bg.png')" }}
>
  <div className="bg-opacity-170 rounded-lg p-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4 place-items-center">
    {/* Total Kms */}
    <div className="flex items-center space-x-3 min-w-0">
      <div className="bg-[#F0F2C7] rounded-lg p-2 flex-shrink-0">
        <img
          src="/images/road.png"
          alt="Total Kms"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
      <div>
        <p className="text-white sm:text-base lg:text-xl font-bold flex items-center">
          {kms.toLocaleString()}{" "}
          <img
            src="/images/plus.svg"
            alt="Plus Icon"
            className="inline h-2 w-2 ml-1"
          />
        </p>
        <p className="text-green-100 sm:text-[12px] lg:text-[16px]">
          Total Kms Travelled
        </p>
      </div>
    </div>

    {/* Number of Drivers */}
    <div className="flex items-center space-x-3 min-w-0">
      <div className="bg-[#F0F2C7] rounded-lg p-2 flex-shrink-0">
        <img
          src="/images/driver.png"
          alt="Drivers"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
      <div>
        <p className="text-white sm:text-base lg:text-xl font-bold flex items-center">
          {drivers.toLocaleString()}{" "}
          <img
            src="/images/plus.svg"
            alt="Plus Icon"
            className="inline h-2 w-2 ml-1"
          />
        </p>
        <p className="text-green-100 sm:text-[12px] lg:text-[16px]">
          Number of Drivers
        </p>
      </div>
    </div>

    {/* Total Rides */}
    <div className="flex items-center space-x-3 min-w-0">
      <div className="bg-[#F0F2C7] rounded-lg p-2 flex-shrink-0">
        <img
          src="/images/cab.png"
          alt="Rides"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
      <div>
        <p className="text-white sm:text-base lg:text-xl font-bold flex items-center">
          {rides.toLocaleString()}{" "}
          <img
            src="/images/plus.svg"
            alt="Plus Icon"
            className="inline h-2 w-2 ml-1"
          />
        </p>
        <p className="text-green-100 sm:text-[12px] lg:text-[16px]">Total Rides</p>
      </div>
    </div>

    {/* Daily Rides */}
    <div className="flex items-center space-x-3 min-w-0">
      <div className="bg-[#F0F2C7] rounded-lg p-2 flex-shrink-0">
        <img
          src="/images/road1.png"
          alt="Daily Rides"
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
        />
      </div>
      <div>
        <p className="text-white sm:text-base lg:text-xl font-bold flex items-center">
          {dailyRides.toLocaleString()}{" "}
          <img
            src="/images/plus.svg"
            alt="Plus Icon"
            className="inline h-2 w-2 ml-1"
          />
        </p>
        <p className="text-green-100 sm:text-[12px] lg:text-[16px]">Daily Rides</p>
      </div>
    </div>
  </div>
</div>

  );
}

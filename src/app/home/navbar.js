"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-white border-b shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <img src="/images/SG LOGO.svg" alt="Logo" className="h-10" />
          </div>

          {/* Center: Navigation */}
          <div className="hidden md:flex space-x-8 text-gray-600 text-sm">
            <ul className="flex space-x-8">
              <li className="cursor-pointer hover:text-gray-800">
                <a href="/home#our-vehicles">Our Vehicles</a>
              </li>
              <li className="cursor-pointer hover:text-gray-800">
                <a href="/home#our-services">Our Services</a>
              </li>
              <li className="cursor-pointer hover:text-gray-800">
                <a href="/home#choose-us">Why Choose Us</a>
              </li>
              <li className="cursor-pointer hover:text-gray-800">
                <a href="/home#testimonials">Our Testimonials</a>
              </li>
            </ul>
          </div>

          {/* Right: Book Now Button */}
          <div className="hidden md:block">
           <a href="/home#our-vehicles"> <button
              onClick={handleClick}
              className="px-4 py-2 bg-[#FFBF34] text-[#01060F] lg:text-base rounded-full font-semibold flex items-center"
            >
              Book Now 
              <img src="/images/arrow.svg" alt="Up Arrow" className="ml-2" />
            </button></a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
           <ul className="space-y-4 py-4 px-4 text-gray-600 text-sm">
  <li className="cursor-pointer hover:text-gray-800">
    <a href="/home#our-vehicles" onClick={() => setIsMenuOpen(false)}>Our Vehicles</a>
  </li>
  <li className="cursor-pointer hover:text-gray-800">
    <a href="/home#our-services" onClick={() => setIsMenuOpen(false)}>Our Services</a>
  </li>
  <li className="cursor-pointer hover:text-gray-800">
    <a href="/home#choose-us" onClick={() => setIsMenuOpen(false)}>Why Choose Us</a>
  </li>
  <li className="cursor-pointer hover:text-gray-800">
    <a href="/home#testimonials" onClick={() => setIsMenuOpen(false)}>Our Testimonials</a>
  </li>
</ul>
            <div className="px-4 py-2">
            <a href="/home#our-vehicles"><button className="px-4 py-2 bg-[#FFBF34] text-[#01060F] lg:text-base rounded-full font-semibold" onClick={() => setIsMenuOpen(false)}>
                Book Now
              </button></a>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer
      className="bg-black text-white bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/Footer-bg.png")' }}
    >
      <div className="bg-opacity-70">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/SG taxi White Ver.svg"
                  alt="Singaporemaxi"
                  className="w-26 h-10"
                />
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <a href="tel:+6584161907">
                  <p>+65 84161907</p>
                </a>

                <a href="mailto:singaporemaxitaxi999@gmail.com">
                  <p>singaporemaxitaxi999@gmail.com</p>
                </a>

                <p>50 Jalan Limbok</p>
              </div>
            </div>

            {/* Empty Space */}
            <div />

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-8 sm:justify-center lg:justify-self-end">
              <div>
                {/* <h3 className="font-semibold mb-4">Company</h3> */}
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>
                    <Link href="/home#our-vehicles">Our Vehicles</Link>
                  </li>
                  <li>
                    <Link href="/home#our-services">Our Services</Link>
                  </li>
                  <li>
                    <Link href="/home#choose-us">Why Choose Us</Link>
                  </li>
                  <li>
                    <Link href="/home#testimonials">Our Testimonials</Link>
                  </li>
                </ul>
              </div>
              <div>
                {/* <h3 className="font-semibold mb-4">Legal</h3> */}
                <ul className="space-y-2 text-sm text-gray-300">
                  {/* <li>
                    <Link href="#">Terms of Service</Link>
                  </li> */}
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  {/* <li>
                    <Link href="#">Cookies Policy</Link>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center sm:text-left text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <span className="text-white">© 2025</span>
              <Link href="#" className="text-[#FFBF34]">
                Singaporemaxi Taxi
              </Link>
              <span className="text-white">All rights reserved.</span>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-white">Reach Us On:</span>
              <Link
                href="https://www.facebook.com/share/15vcATFhNc/"
                target="blank"
              >
                <img
                  src="/images/facebook-01.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </Link>
              <Link
                href="https://www.instagram.com/taxisingapore?igsh=N2NhajZ6YTQzbW52"
                target="blank"
              >
                <img
                  src="/images/insta.svg"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </Link>
              <Link
                href="mailto:singaporemaxitaxi999@gmail.com"
                target="blank"
              >
                <img
                  src="/images/mail-01.svg"
                  alt="mail"
                  className="w-5 h-5"
                />
              </Link>
              <Link
                href="https://youtube.com/@singaporemaxitaxi?si=Ic9F0jNSFeChv-Ry"
                target="blank"
              >
                <img
                  src="/images/youtube.svg"
                  alt="call"
                  className="w-5 h-5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

        {/* Floating Icons */}
        <div className="fixed bottom-[3.5rem] right-6 flex flex-col items-end space-y-3">
        {/* WhatsApp */}
        <a
          href="https://wa.me/6584161907"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded-full shadow-lg "
          aria-label="Contact via WhatsApp"
        >
          <img
            src="/images/whatsapp1.svg"
            alt="WhatsApp"
            className="w-11 h-11"
          />
        </a>

        {/* Viber */}
        <a
          href="https://vb.me/letsChatOnViber "
          target="_blank"
          className="p-1 rounded-full shadow-lg "
          aria-label="Contact via Viber"
        >
          <img
            src="/images/s-viber.svg"
            alt="Viber"
            className="w-12 h-12"
          />
        </a>

        {/* Telegram */}
        <a
          href="https://telegram.org/dl "
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded-full shadow-lg "
          aria-label="Contact via Telegram"
        >
          <img
            src="/images/s-telegram.svg"
            alt="Telegram"
            className="w-11 h-11"
          />
        </a>
      </div>

      <div className="fixed bottom-6 left-6 flex flex-col items-end space-y-3">
        {/* WhatsApp */}
        <a
          href="tel:+6584161907"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 rounded-full shadow-lg bg-blue-500"
          aria-label="Contact via WhatsApp"
        >
          <img
            src="/images/call.svg"
            alt="WhatsApp"
            className="w-11 h-11"
          />
        </a>
      </div>
      {/* <div className="fixed bottom-6 right-6 flex flex-col-reverse items-end">
       
        <button
          onClick={toggleMenu}
          className="text-white p-2 rounded-full shadow-lg bg-yellow-500 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X />
          ) : (
            <img
              src="/images/menu.svg"
              alt="Menu"
              className="w-8 h-8 transform transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            />
          )}
        </button>

        
        <div
          className={`flex flex-col space-y-2 transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ marginBottom: "10px" }} 
        >
          
          <a
            href="https://wa.me/6584161907"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-1.5 rounded-full shadow-lg bg-green-500 transition-transform duration-300"
            style={{ transform: isOpen ? "translateY(0)" : "translateY(10px)" }}
            aria-label="Contact via WhatsApp"
          >
            <img
              src="/images/whatsapp1.svg"
              alt="WhatsApp"
              className="w-8 h-8"
            />
          </a>

         
          <a
            href="tel:+6584161907"
            className="text-white p-1.5 rounded-full shadow-lg bg-blue-500 transition-transform duration-300"
            style={{ transform: isOpen ? "translateY(0)" : "translateY(10px)" }}
            aria-label="Call Now"
          >
            <img src="/images/call.svg" alt="Call Now" className="w-8 h-8" />
          </a>

          
          <a
            href="mailto:singaporemaxitaxi999@gmail.com"
            className="text-white p-1.5 rounded-full shadow-lg bg-red-500 transition-transform duration-300"
            style={{ transform: isOpen ? "translateY(0)" : "translateY(10px)" }}
            aria-label="Send an Email"
          >
            <img src="/images/mail.svg" alt="Email" className="w-8 h-8" />
          </a>

         
          <a
            href="https://www.facebook.com/share/15vcATFhNc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-1.5 rounded-full shadow-lg bg-blue-700 transition-transform duration-300"
            style={{ transform: isOpen ? "translateY(0)" : "translateY(10px)" }}
            aria-label="Share on Facebook"
          >
            <img
              src="/images/facebook.svg"
              alt="Facebook"
              className="w-8 h-8"
            />
          </a>

         
          <a
            href="https://www.instagram.com/taxisingapore?igsh=N2NhajZ6YTQzbW52"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-1.5 rounded-full shadow-lg bg-pink-500 transition-transform duration-300"
            style={{ transform: isOpen ? "translateY(0)" : "translateY(10px)" }}
            aria-label="Visit Instagram"
          >
            <img
              src="/images/instagram.svg"
              alt="Instagram"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div> */}
    </footer>
  );
}

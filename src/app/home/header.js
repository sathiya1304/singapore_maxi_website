"use client";
import React, { useState, useEffect } from "react";
import { axiosGet, axiosPost } from "@/lib/api";
// import { useSearchParams } from "next/navigation";
import { useSearchContext } from "@/app/context/searchcontext";
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { modelId, passengers, updatemodelIds, updatePassengers } =
    useSearchContext();

  const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState(null);
  // const [error, setError] = useState(null);
  // const search = useSearchParams();
  // const modelIdss = search.get("modelIds");
  // const passengers = search.get("passengers");
  const [name, setName] = useState("");
  const [modelIds, setmodelIds] = useState("");
  const [modelName, setmodelName] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [pickUpLocation, setpickupLocation] = useState("");
  const [dropLocation, setdropLocation] = useState("");
  const [Passengers, setpassengers] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [modelType, setmodelType] = useState([]);
  const [postError, setPostError] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [limitEnd, setlimitEnd] = useState("15");
  const [dataCount, setdataCount] = useState(0);
  const [orderField, setOrderField] = useState("created_date");
  const [orderType, setOrderType] = useState("desc");
  const [createdStartDate, setCreatedStartDate] = useState("");
  const [createdEndDate, setCreatedEndDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");

  const handleModelChange = (event) => {
    const selectedModelName = event.target.value;

    if (!Array.isArray(modelType)) {
      console.error("modelType is not an array:", modelType);
      return;
    }

    const selectedModel = modelType.find(
      (model) => model.model === selectedModelName
    );
    if (selectedModel) {
      setmodelIds(selectedModel.data_uniq_id || "");
      setmodelName(selectedModel.model || "");
    }
  };

  useEffect(() => {
    setpassengers(passengers || "");
    const selectedModel = modelType.find(
      (model) => model.data_uniq_id === modelId
    );

    if (selectedModel) {
      setmodelIds(selectedModel.data_uniq_id || "");
      setmodelName(selectedModel.model || "");
    }
  }, [modelId, passengers]);

  useEffect(() => {
    // Get the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const modelIdss = params.get("modelIds");
    const passengers = params.get("passengers");

    // Set passengers value
    setpassengers(passengers || "");

    // Ensure modelType has been populated and is an array
    if (modelType && Array.isArray(modelType) && modelType.length > 0) {
      // Find the selected model using modelIdss from the URL
      const selectedModel = modelType.find(
        (model) => model.data_uniq_id === modelIdss
      );

      // If selectedModel exists, set modelIds and modelName
      if (selectedModel) {
        setmodelIds(selectedModel.data_uniq_id || "");
        setmodelName(selectedModel.model || "");
      }
    }
  }, [modelType]);

  const handleContactNumberChange = (e) => {
    let value = e.target.value;

    value = value.replace(/[^0-9+]/g, "");


    if (value.length > 11) {
      value = value.substring(0, 12);
    }

    setcontactNumber(value);
  };


  const fetchData = async () => {
    setIsLoading(true);
    axiosGet
      .get(
        `model_master_web_get?page=${pageNumber}&items_per_page=${limitEnd}&search_input=${searchValue}&from_date=${createdStartDate}&to_date=${createdEndDate}&order_type=${orderType}&order_field=${orderField}&active_status=${activeStatusFilter === 3 ? "" : activeStatusFilter
        }`
      )
      .then((response) => {
        setmodelType(response.data.data);
        setdataCount(response.data.total_items);
        setPageCount(response.data.total_pages);
        setPageNumber(pageNumber === 0 ? 1 : pageNumber);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [
    pageNumber,
    limitEnd,
    searchValue,
    createdStartDate,
    createdEndDate,
    orderField,
    orderType,
    activeStatusFilter,
  ]);

  const handleSubmit = () => {
    setIsLoading(true);
    const jsonData = {
      name: name,
      contact_number: contactNumber,
      pickup_loc: pickUpLocation,
      ref_model_id: modelIds,
      ref_model_name: modelName,
      drop_loc: dropLocation,
      passengers: Passengers,
      date: date,
      time: time,
    };
    axiosPost
      .post(`/enquiry`, jsonData)
      .then((response) => {
        if (response.data.action === "success") {
          setName("");
          setcontactNumber("");
          setpickupLocation("");
          setdropLocation("");
          setpassengers("");
          setdate("");
          settime("");
          setmodelIds("");
          setmodelName("");
          setPopupVisible(true); // Show the popup on success
        } else {
          setPostError(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error during POST:", error.response || error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const slides = [
    {
      imageDesktop: "/images/banner_01.jpg",
    },
    {
      imageDesktop: "/images/banner_02.jpg",
    },
    {
      imageDesktop: "/images/banner_03.jpg",
    },
  ];


  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000) // 3 seconds interval
    return () => clearInterval(interval)
  }, [])


  return (
    <>

      <div className="relative w-full h-[70vh] sm:h-[70vh] md:h-[60vh] lg:h-[500px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 h-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative" style={{ minWidth: "100%" }}>
              {/* Mobile View */}
              <div className="sm:block md:hidden w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${slide.imageMobile || slide.imageDesktop || "/placeholder.svg"})` }}>
              </div>

              {/* Desktop View */}
              <img
                src={slide.imageDesktop || "/placeholder.svg"}
                alt={`Slide ${index + 1}`}
                fill
                sizes="100vw"
                priority
                className="object-cover hidden md:block h-full w-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center">
                <div className="absolute top-4 left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 z-10">
                  <img src="/images/gif3.webp" alt="Singapore Flag" fill className="object-cover" />
                </div>
                <h1 className="text-[#ffffff] text-lg sm:text-xl md:text-2xl font-bold">WELCOME TO <span className="text-red-600">SINGAPORE MAXI TAXI</span> </h1>
                <p className="text-[#FFBF34] text-xl sm:text-xl md:text-xl font-bold mt-2 sm:mt-4">Book, Ride, Repeat</p>
                <p className="text-red-600 text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-4">24/7</p>

                <p className="text-white text-xs sm:text-sm md:text-lg mt-1 sm:mt-2 font-black">Book a ride from Anywhere Anytime in just a few steps</p>
                {/* <button className="mt-4 sm:mt-6 px-4 sm:px-6 py-1.5 sm:py-2 bg-[#FFBF34] text-[#01060F] text-sm sm:text-base rounded-full font-semibold hover:bg-[#FFD700] transition-colors duration-300">
            Book Now
          </button> */}
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-[#FFBF34] w-4 sm:w-6" : "bg-white bg-opacity-50 hover:bg-opacity-100"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>



      {/* Booking Section */}
      {/* <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 -mt-16 relative z-10" id="book">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Book Your Ride</h2>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              title="Only alphabetic characters and spaces are allowed."
              className="border px-4 py-3 pr-10 rounded-lg w-full"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {postError?.name && (
              <p className="text-red-500 text-xs mt-1">{postError?.name}</p>
            )}
            <img
              src="/images/name.png"
              alt="User Icon"
              className="absolute right-3 top-10"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your Contact Number"
              title="Only numeric values are allowed."
              className="border px-4 py-3 pr-10 rounded-lg w-full"
              required
              value={contactNumber}
              onChange={handleContactNumberChange}
            />
            <img
              src="/images/call.png"
              alt="Phone Icon"
              className="absolute right-3 top-10"
            />
            {postError?.contact_number && (
              <p className="text-red-500 text-xs mt-1">
                {postError?.contact_number}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pick Up Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Type Location"
              pattern="[A-Za-z0-9\s,]+"
              title="Only alphanumeric characters, spaces, and commas are allowed."
              className="border px-4 py-3 pr-10 rounded-lg w-full"
              required
              value={pickUpLocation}
              onChange={(e) => setpickupLocation(e.target.value)}
            />
            <img
              src="/images/location.svg"
              alt="Location Icon"
              className="absolute right-3 top-10"
            />
            {postError?.pickup_loc && (
              <p className="text-red-500 text-xs mt-1">
                {postError?.pickup_loc}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Drop Off Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Type Location"
              pattern="[A-Za-z0-9\s,]+"
              title="Only alphanumeric characters, spaces, and commas are allowed."
              className="border px-4 py-3 pr-10 rounded-lg w-full"
              required
              value={dropLocation}
              onChange={(e) => setdropLocation(e.target.value)}
            />
            <img
              src="/images/location.svg"
              alt="Location Icon"
              className="absolute right-3 top-10"
            />
            {postError?.drop_loc && (
              <p className="text-red-500 text-xs mt-1">{postError?.drop_loc}</p>
            )}
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passengers <span className="text-red-500">*</span>
            </label>
            <input
              className="border px-4 py-3 rounded-md w-full"
              value={Passengers}
              onChange={(e) => {
               
                const regex = /^[0-9/\\-]*$/;
                if (regex.test(e.target.value)) {
                  setpassengers(e.target.value);
                }
              }}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              className="border px-4 py-3 rounded-lg w-full"
              required
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setdate(e.target.value)}
            />
            {postError?.date && (
              <p className="text-red-500 text-xs mt-1">{postError?.date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              className="border px-4 py-3 rounded-lg w-full"
              required
              value={time}
              onChange={(e) => settime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose Model
            </label>
            <select
              className="border px-4 py-3 rounded-lg w-full"
              required
              onChange={handleModelChange}
              value={modelName}
            >
              <option>Choose model</option>
              {Array.isArray(modelType) &&
                modelType.map((model_type) => (
                  <option
                    key={model_type.data_uniq_id}
                    value={model_type.model}
                  >
                    {model_type.model}
                  </option>
                ))}
            </select>
          </div>

         
          <div className="flex lg:justify-end sm:justify-start sm:col-span-2 md:col-span-1 py-9 pb-4">
            <button
              className="flex items-center px-6 py-2 bg-[#FFBF34] text-black lg:text-sm rounded-full font-semibold"
              onClick={handleSubmit}
            >
              Enquiry Now
              <img
                src="/images/arrow.svg"
                alt="Up Arrow"
                className="ml-2"
                width="16"
                height="16"
              />
            </button>
          </div>
        </div>

        {postError?.passengers && (
          <p className="text-red-500 text-xs mt-1">{postError?.passengers}</p>
        )}

        {popupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-8 rounded-md shadow-md text-center">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                onClick={() => setPopupVisible(false)}
              >
                <span className="text-2xl font-bold">&times;</span>
              </button>
              <h2 className="text-2xl font-bold mb-4">Thank you!</h2>
              <p className="text-gray-600 mb-6">
                Thanks for your enquiry. We will get back to you soon.
              </p>
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default Header;

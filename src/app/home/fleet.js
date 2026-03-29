"use client";

import React, { useState, useEffect } from "react";
import { axiosGet, axiosPost } from "@/lib/api"; // Assuming axiosGet is correctly configured
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useSearchContext } from "../context/searchcontext";
import { API_ENDPOINT } from "@/lib/config";

export default function CarFleet() {
  const { updateModelId, updatePassengers } = useSearchContext();
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [SectionOne, setSectionOne] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalData, setModalData] = useState({}); // Modal data state

  const { modelId, passengers, updatemodelIds } =
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
          setPopupVisible(true);
          setIsModalOpen(false)
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

  // Effect for Carousel API
  useEffect(() => {
    if (api) {
      const onSelect = () => {
        setCurrent(api.selectedScrollSnap());
      };
      api.on("select", onSelect);
      return () => api.off("select", onSelect);
    }
  }, [api]);

  // Fetch page data
  const getPageData = () => {
    axiosGet
      .get("web_pages_get?unique_keyname=home_page&has_limit=0")
      .then((response) => {
        const data = response.data.data[0]?.section_details || [];
        const sectionOneData = data?.find(
          (item) => item.UniqueSectionName === "our_vehicles"
        );
        setSectionOne(sectionOneData?.block_details || []);
      })
      .catch((error) => {
        console.error("Error fetching page data:", error);
      });
  };


  useEffect(() => {
    getPageData();
  }, []);

  const displayData = SectionOne.length > 0
    ? SectionOne
    : modelType.map((m) => ({
        ContentBlockID: m.data_uniq_id,
        BlockName: m.data_uniq_id,
        BlockNames: m.model,
        BlockImage: null,
        BlockImagePath: null,
        Title: 'Maxi Cab',
        SubTitle: '',
        Description: 'Available',
        items_details: [],
      }));

  // Carousel item scale calculation
  const getItemScale = (index) => {
    const diff = Math.abs(index - current);
    if (diff === 0) return "scale-100";
    if (diff === 1 || diff === displayData.length - 1) return "scale-75";
    return "scale-50";
  };

  // Handle Book Now click
  const handleBookNow = () => {
    const blockName = displayData[current]?.BlockName || "";
    const subTitle = displayData[current]?.SubTitle || "";


    updateModelId(blockName);
    updatePassengers(subTitle);

    // Open modal and pass data
    setModalData({
      modelId: blockName,
      passengers: subTitle,
    });
    setIsModalOpen(true);
  };

  // Carousel navigation handlers
  const handlePrev = () => {
    if (api) api.scrollPrev();
  };

  const handleNext = () => {
    if (api) api.scrollNext();
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showData, setShowData] = useState([])
  const handleShowMore = () => {
    setIsPopupOpen(true);
    setShowData(displayData[current]?.items_details)
  };


  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup when the close button is clicked
  };

  return (
    <div className="w-full px-6 py-16" id="our-vehicles">
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">Available Vehicles and Transfers</h1>
      <div className="relative mx-auto">
        <Carousel
          setApi={(carouselApi) => setApi(carouselApi)}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {displayData.map((car, index) => (
              <CarouselItem
                key={car.ContentBlockID}
                className={cn(
                  "md:basis-1/3 lg:basis-1/5",
                  index === 1 || index === 6 ? "px-4" : "px-2"
                )}
              >
                <div
                  className={cn(
                    "relative transition-transform duration-500 ease-in-out",
                    "opacity-100",
                    getItemScale(index),
                    current === index ? "z-10" : "opacity-100"
                  )}
                >
                  <Card className="relative overflow-hidden border-none shadow-none">
                    <img
                      src={car.BlockImagePath || car.BlockImage ? `${API_ENDPOINT}${car.BlockImagePath ?? car.BlockImage}` : '/images/Car.svg'}
                      alt={car.BlockNames}
                      className="w-full h-auto object-cover"
                      style={{
                        transition:
                          "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">
              {displayData[current]?.BlockNames || 'Vehicle Name'}
            </h3>
            <div></div> {/* Empty div to keep the title centered */}
          </div>

          {/* Info Section */}
          <div className="relative flex flex-wrap items-center justify-center gap-4 text-sm">
            {/* Left Arrow (Desktop Only) */}
            <div className="hidden lg:block absolute left-0 transform -translate-x-full pr-6">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-black"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* Luxury Set */}
            <div className="flex items-center gap-1">
              <img src="/images/luxury.svg" alt="Luxury" className="h-4 w-4" />
              {displayData[current]?.Title || 'Luxury'}
            </div>

            {/* Passengers Set */}
            <div className="flex items-center gap-1">
              <img src="/images/passengers.svg" alt="Passengers" className="h-4 w-4" />
              {displayData[current]?.SubTitle || 0} Passengers
            </div>

            {/* Availability Set */}
            <div className="flex items-center gap-1">
              <img
                src={
                  displayData[current]?.Description === 'Available'
                    ? '/images/status.svg'
                    : '/images/unavailble.svg'
                }
                alt="Available Status"
                className="h-4 w-4"
              />
              {displayData[current]?.Description === 'Available'
                ? 'Available'
                : 'Not Available'}
            </div>

            {/* Right Arrow (Desktop Only) */}
            <div className="hidden lg:block absolute right-0 transform translate-x-full pl-6">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-black"
                onClick={handleNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {/* Show More Button */}
            <Button
              className="px-8 rounded-full bg-white text-black border border-black font-bold hover:bg-[#FFBF34] hover:text-black"
              onClick={handleShowMore}
            >
              Show More
            </Button>

            {/* Book Now Button */}
            <Button
              className="px-8 rounded-full bg-[#FFBF34] text-black font-bold hover:bg-[#FFBF34] hover:text-black"
              onClick={handleBookNow}
            >
              Book Now
              <img src="/images/arrow.svg" alt="Up Arrow" />
            </Button>
          </div>

          {/* Mobile Arrows */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border border-black"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border border-black"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Popup Modal */}
          {isPopupOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg max-w-md w-full">
                <h4 className="text-md font-semibold capitalize">
                  {displayData[current]?.Title}
                </h4>
                {showData?.map((data, index) => (
                  <div key={index}>
                    {/* <h4 className="text-md font-semibold">
                        13 passengers with Hand carry / 9 passengers with 12 luggages
                      </h4> */}
                    <div className="mt-4 space-y-2">
                      <p className="font-normal capitalize">
                        <strong>{data?.Content} : </strong>
                        <span className="text-red-500 font-bold">{data?.price && <>{data?.price}</>}</span>
                      </p>
                      {/* <p className="font-normal">
                        <strong>Local Transfer:</strong>
                        <span className="text-red-500 font-bold"> 60$</span>
                      </p>
                      <p className="font-normal">
                        <strong>Airport Arrival Transfer:</strong>
                        <span className="text-red-500 font-bold"> 80$</span>
                      </p>
                      <p className="font-normal">
                        <strong>Airport Departure Transfer:</strong>
                        <span className="text-red-500 font-bold"> 70$</span>
                      </p>
                      <p className="font-normal">
                        <strong>Disposal Hourly (min 3hrs):</strong>
                        <span className="text-red-500 font-bold"> 55$ per hour</span>
                      </p>
                      <p className="font-normal">
                        <strong>Disposal 10 Hours Booking:</strong>
                        <span className="text-red-500 font-bold"> 550$</span>
                      </p>
                      <p className="font-normal">
                        <strong>City Tour (3hrs):</strong>
                        <span className="text-red-500 font-bold"> 55$ per hour</span>
                      </p> */}
                    </div>
                  </div>))}
                <div className="mt-4 text-center">
                  <Button
                    className="px-6 py-2 rounded-full bg-[#FFBF34] text-black hover:bg-[#FFBF34] font-bold"
                    onClick={handleClosePopup}
                  >
                    Close
                  </Button>
                </div>
              </div>

            </div>
          )}

        </div>



      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[700px] p-6 relative">
            {/* Close Button */}
            {/* <button
  className="absolute top-2 right-2 text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center md:top-3 md:right-3"
  onClick={() => setIsModalOpen(false)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button> */}


            {/* Modal Header */}
            {/* <h2 className="text-2xl font-semibold mb-4 text-center">
        Book Your Ride
      </h2> */}

            {/* Modal Body */}
            <div
              className="max-w-5xl mx-auto   rounded-lg p-6 md:p-8 relative z-10 overflow-hidden"

            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
                Book Your Ride
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mb-4 overflow-y-auto max-h-[calc(100vh-150px)]">
                {/* Name Field */}
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

                {/* Contact Number Field */}
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

                {/* Pick Up Location */}
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

                {/* Drop Off Location */}
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

                {/* Passengers */}
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

                {/* Date */}
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

                {/* Time */}
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

                {/* Choose Model */}
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
              </div>

              <div className="flex justify-center md:justify-center py-6 space-x-4">
                <button
                  className="flex items-center px-6 py-2 bg-white text-black border border-black text-sm rounded-full font-semibold"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="flex items-center px-6 py-2 bg-[#FFBF34] text-black text-sm rounded-full font-semibold"
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



            {/* Modal Footer */}
            {/* <div className="mt-6 flex justify-between items-center">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button
          className="bg-[#FFBF34] text-black px-6 py-2 rounded-md hover:bg-[#f2b72c]"
          onClick={() => {
            // Perform booking logic here
            setIsModalOpen(false);
          }}
        >
          Book Now
        </button>
      </div> */}
          </div>
        </div>
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
    </div>
  );
}

"use client";
import React from "react";
import { useState, useEffect } from "react";

// import Carousel from "./CarFleet";
import TaxiServices from "@/app/home/trip";
import CarFleet from "@/app/home/fleet";
import TestimonialCarousel from "@/app/home/testimonial";
import StatsSection from "@/app/home/count";
import WhyChooseUs from "@/app/home/chooseus";
// import Footer from "./Footer";
import Header from "@/app/home/header";
import Ticket from "./tickets";
// import Navbar from "./Navbar";

const Section = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <CarFleet />
      <Ticket />
      <TaxiServices />
      <WhyChooseUs />
      <StatsSection />
      <TestimonialCarousel />
      {/* <Footer /> */}
    </>
  );
};

export default Section;

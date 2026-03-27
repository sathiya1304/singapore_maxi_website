"use client";

import React, { useRef } from "react";
import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Vivian Balakrishnan",
    image: "/images/Boy.svg",
    text: "Booking with Singaporemaxi Taxi was effortless, and the driver arrived on time with a warm smile. The vehicle was pristine, and the ride was extremely relaxing. The driver made sure to follow all safety protocols and even adjusted the temperature for my comfort. This level of thoughtfulness is rare, and I'll definitely recommend their service to everyone.",
    rating: 5,
  },
  {
    name: "Nadira Ibrahim",
    image: "/images/Car.svg",
    text: "Singaporemaxi Taxi  has quickly become my favorite transportation option. Their punctual and courteous drivers always ensure a smooth ride. The cars are spotless and provide a luxurious experience at great rates. I appreciated how the driver expertly navigated around heavy traffic to save time. Reliable service like this is hard to find!",
    rating: 5,
  },
  {
    name: "Kairo Lim",
    image: "/images/Boy.svg",
    text: "My trip with Singaporemaxi Taxi  was exceptional! The driver arrived ahead of time and waited patiently without rushing me. The car was immaculate, and the journey was smooth and relaxing. I was impressed with the driver's professionalism and attention to detail, ensuring I reached my destination comfortably.",
    rating: 5,
  },
  {
    name: "Jia En Lee",
    image: "/images/Car.svg",
    text: "I've had nothing but excellent experiences with Singaporemaxi Taxi! The booking process was simple and convenient. The car was clean, and the driver was incredibly professional and friendly. They ensured a safe ride and even went the extra mile to check if I needed anything during the trip. This kind of service sets them apart!",
    rating: 5,
  },
  {
    name: "Shaan Pillai",
    image: "/images/Boy.svg",
    text: "Singaporemaxi Taxi truly offers a superior service! The driver arrived promptly, and the car was in pristine condition. The ride was comfortable, and I appreciated the driver's courteous attitude and efficient route selection. The overall experience was seamless and stress-free. I'll be choosing them for all my future trips!",
    rating: 5,
  },
  {
    name: "Yasmin Cheng",
    image: "/images/Car.svg",
    text: "I used Singaporemaxi Taxi  for an early morning ride to the airport, and the experience was flawless. The driver was punctual, polite, and helped me load my luggage into the car. The journey was smooth, and the vehicle was spotless and comfortable. Their attention to detail and professionalism make them stand out.",
    rating: 5,
  },
];


export default function TestimonialCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16" id="testimonials">
      <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12">
        What Our Clients Say
      </h2>
      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
            skipSnaps: false,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-4 pt-10">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full absolute left-1/2 -top-10 transform -translate-x-1/2 z-10 shadow-lg">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6 pt-12">
                      <h3 className="text-xl font-semibold mb-2 text-center pt-6">
                        {testimonial.name}
                      </h3>
                      <div className="flex gap-1 mb-4 justify-center">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-center text-muted-foreground">
                        {testimonial.text}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative border-2 border-black" />
            <CarouselNext className="relative border-2 border-black" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}


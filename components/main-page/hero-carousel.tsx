"use client";

import { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@nextui-org/image";

const steps = [
  {
    title: "Connect your wallet or create an account",
    description: "You can update or see your info on the profile screen.",
    image: "images/hero1.png",
    alt: "placeholder image1",
  },
  {
    title: "Fund your wallet with $Bidcoin",
    description: "$Bidcoin will be used for each bide you make",
    image: "images/hero2.png",
    alt: "placeholder image2",
  },
  {
    title: "Start bidding!",
    description:
      "If you win an item, you will have 48 hours to pay or it will go to the next bidder.",
    image: "images/hero3.png",
    alt: "placeholder image3",
  },
  {
    title: "Auctions!",
    description: "Items show up on the auction screen for users to bid on",
    image: "images/hero4.png",
    alt: "placeholder image4",
  },
];

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + steps.length) % steps.length
      );
    }
  };

  return (
    <div className="h-[400px]  w-full rounded-lg shadow-lg relative bg-gradient-to-r dark:from-background dark:via-slate-900 dark:to-background from-white via-blue-100 to-white">
      <Card className="bg-transparent shadow-none p-0 max-h-full">
        <CardBody className="text-center px-16">
          <div className="h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full flex items-center justify-start transition-all duration-300 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={400}
                  height={400}
                />
                <div className="flex flex-col text-left items-start ml-5">
                  <h2 className="text-3xl font-semibold mb-4 text-primary">
                    {step.title}
                  </h2>
                  <p className=" mb-8 text-lg max-w-md">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <Button
        isIconOnly
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-blue-300 hover:bg-opacity-20 dark:text-white text-primary p-2 rounded-full transition duration-300 ease-in-out"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} />
      </Button>
      <Button
        isIconOnly
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-blue-300 hover:bg-opacity-20 dark:text-white text-primary p-2 rounded-full transition duration-300 ease-in-out"
        disabled={isTransitioning}
      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
};


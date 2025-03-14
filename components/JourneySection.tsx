"use client";

import React from "react";
import Image from "next/image";

const steps = [
  "Connect your wallet and verify your identity",
  "Choose from our selection of exclusive raffles",
  "Purchase tickets",
  "Win big and claim your prizes instantly",
];

const JourneySection = () => {
  return (
    <section className="container mx-auto px-6 py-20 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 relative">
          <Image
            src="/tunnel.gif"
            alt="Journey"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6">
            Start Your <span className="text-[#AFFF81]">Journey</span>
          </h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-[#AFFF81] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;

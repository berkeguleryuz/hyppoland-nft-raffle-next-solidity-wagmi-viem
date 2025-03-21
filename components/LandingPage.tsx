"use client";

import React from "react";
import Image from "next/image";
import GlobalNetworkSection from "./GlobalNetworkSection";
import FeaturesSection from "./FeaturesSection";
import JourneySection from "./JourneySection";
import Area from "./Area";
import { Header } from "./Header";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-5 pointer-events-none">
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="col-span-1 bg-[#AFFF81]/20 h-full"></div>
        ))}
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-6 py-20 text-center flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-1">
            Welcome to <span className="text-[#AFFF81]">Hyppo</span>Land
          </h1>
          <p className="mb-8 text-sm text-lime-200">Powered by OnChainWin</p>
          <div className="flex justify-between w-full sm:px-48 px-2 items-center gap-2">
            <Image
              src="/test.gif"
              alt="arrow-right"
              width={500}
              height={500}
              className="w-24 h-24 ml-2"
            />
            <button className="bg-[#AFFF81] text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#AFFF81]/80 transition-colors flex items-center justify-center">
              Join Now
            </button>
            <Image
              src="/test.gif"
              alt="arrow-right"
              width={500}
              height={500}
              className="w-24 h-24 ml-2"
            />
          </div>
        </main>

        <div className="container mx-auto px-6 py-20 z-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg p-4 ${
                  i % 2 === 0 ? "bg-[#AFFF81]/20" : "bg-[#AFFF81]/20"
                } transform hover:scale-105 transition-transform`}>
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#AFFF81] via-lime-500 to-[#AFFF81] flex items-center justify-center">
                  <Image
                    src="/placeholder.png"
                    alt="logo"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Area />

        <GlobalNetworkSection />
        <FeaturesSection />
        <JourneySection />
        <footer className="container mx-auto border-t border-[#AFFF81] flex justify-between items-center py-4">
          <div className="bg-[#AFFF81] h-[50px] w-[100px] flex items-center justify-center">
            <Image
              src="/hyppos.svg"
              alt="logo"
              width={1000}
              height={500}
              className="w-16 h-16"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Powered by</p>
            <Image src="/ocwlogo.png" alt="logo" width={100} height={100} />
          </div>
        </footer>
      </div>

      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-[#AFFF81]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-[#AFFF81]/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default LandingPage;

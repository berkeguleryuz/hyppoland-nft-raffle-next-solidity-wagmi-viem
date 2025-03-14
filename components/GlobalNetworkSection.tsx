"use client";

import React from "react";
import Image from "next/image";

const GlobalNetworkSection = () => {
  return (
    <section className="container mx-auto px-6 py-20 relative">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-6">
            Perfect Blockchain <span className="text-[#AFFF81]">Network</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Join our raffles and win prizes from across the globe.
          </p>
          <p className="text-orange-200">With OnChainWin</p>
          <div className="flex gap-4">
            <div className="bg-[#AFFF81]/10 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-[#AFFF81]">10K+</h3>
              <p className="text-sm">Active Users</p>
            </div>
            <div className="bg-[#AFFF81]/10 p-4 rounded-lg">
              <h3 className="text-2xl font-bold text-[#AFFF81]">50+</h3>
              <p className="text-sm">Countries</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src="/world-map.png"
            alt="Global Network"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection; 
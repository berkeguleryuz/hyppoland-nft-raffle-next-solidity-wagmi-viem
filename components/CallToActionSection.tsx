import Link from "next/link";
import React from "react";

const CallToActionSection = () => {
  return (
    <section className="container mx-auto px-6 py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,255,129,0.2),transparent_70%)]"></div>
      <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border border-[#AFFF81]/30 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#AFFF81]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#AFFF81]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            Ready to Join <span className="text-[#AFFF81]">HyppoLand</span>?
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
            Enter our exciting world of NFT raffles, win exclusive Hyppos NFTs,
            and become part of our growing community. Start your journey today!
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link
              href="/app"
              className="inline-flex bg-[#AFFF81] text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#AFFF81]/90 transition-colors items-center justify-center">
              Enter HyppoLand App
            </Link>
            <Link
              href="/nft-raffle-guide"
              className="inline-flex border-2 border-[#AFFF81]/50 text-[#AFFF81] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#AFFF81]/10 transition-colors items-center justify-center">
              Learn About Raffles
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 border border-[#AFFF81]/20 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="bg-[#AFFF81]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#AFFF81]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#AFFF81] mb-2">
                Free Raffles
              </h3>
              <p className="text-gray-300 text-sm">
                Participate in our free raffles with no cost, just gas fees.
              </p>
            </div>
            <div className="bg-black/30 border border-[#AFFF81]/20 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="bg-[#AFFF81]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#AFFF81]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#AFFF81] mb-2">
                NFT Raffles
              </h3>
              <p className="text-gray-300 text-sm">
                Buy tickets to win rare NFTs from our exclusive collections.
              </p>
            </div>
            <div className="bg-black/30 border border-[#AFFF81]/20 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="bg-[#AFFF81]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#AFFF81]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#AFFF81] mb-2">
                Fair Distribution
              </h3>
              <p className="text-gray-300 text-sm">
                Smart contracts ensure transparent and fair winner selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;

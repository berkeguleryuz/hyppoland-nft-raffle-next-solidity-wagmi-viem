"use client";

import {
  Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS,
  Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
  HypposNFT_CONTRACT,
} from "@/constants/contracts";
import { Fragment, useState } from "react";
import FreeSetupCard from "./FreeSetupCard";
import { NFTApprovalCard } from "./NFTApprovalCard";
import { NFTLoadCard } from "./NFTLoadCard";
import { RaffleSetupCard } from "./RaffleSetupCard";
import Link from "next/link";
import { RaffleStatusIndicator } from "./RaffleStatusIndicator";

const NFTRaffleAdminSetup = () => {
  const [activeTab, setActiveTab] = useState<"nft" | "free">("nft");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("nft")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === "nft"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
          }`}>
          NFT Raffle Setup
        </button>
        <button
          onClick={() => setActiveTab("free")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeTab === "free"
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
          }`}>
          Free Raffle Setup
        </button>
      </div>
      <div className="text-white flex flex-col mb-2">
        Hyppos Contract Address
        <span className="font-mono text-sm text-[#AFFF81] border-b border-dashed border-[#AFFF81]">
          {HypposNFT_CONTRACT}
        </span>
      </div>

      {activeTab === "nft" ? (
        <Fragment>
          <Link
            href={`https://purrsec.com/address/${Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS}`}
            className="font-mono text-sm bg-[#AFFF81] text-black px-2 py-1 rounded-md font-bold"
            target="_blank">
            NFT Raffle Contract: {Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS}
          </Link>

          <RaffleStatusIndicator contractType="nft" />

          <div className="mx-auto grid w-full md:min-w-7xl grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <NFTApprovalCard />
            <NFTLoadCard />
            <RaffleSetupCard />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Link
            href={`https://purrsec.com/address/${Hyppoland_FREE_NFT_CONTRACT_ADDRESS}`}
            className="font-mono text-sm bg-[#AFFF81] text-black px-2 py-1 rounded-md font-bold"
            target="_blank">
            Free Raffle Contract: {Hyppoland_FREE_NFT_CONTRACT_ADDRESS}
          </Link>

          <RaffleStatusIndicator contractType="free" />

          <div className="mx-auto w-full max-w-2xl mt-2">
            <FreeSetupCard />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default NFTRaffleAdminSetup;

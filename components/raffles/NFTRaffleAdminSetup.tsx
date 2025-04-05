"use client";

import { NFTApprovalCard } from "./NFTApprovalCard";
import { NFTLoadCard } from "./NFTLoadCard";
import { RaffleSetupCard } from "./RaffleSetupCard";
import { HypposNFT_CONTRACT } from "@/constants/contracts";
export const NFTRaffleAdminSetup = () => {
  return (
    <div className="bg-black">
      <div className="text-white flex flex-col items-center justify-center my-2 font-bold">
        Hyypos NFT Address
        <span className="text-[#AFFF81]">{HypposNFT_CONTRACT}</span>
      </div>
      <div className="mx-auto grid w-full min-w-7xl grid-cols-1 md:grid-cols-3 gap-4">
        <NFTApprovalCard />
        <NFTLoadCard />
        <RaffleSetupCard />
      </div>
    </div>
  );
};

export default NFTRaffleAdminSetup;

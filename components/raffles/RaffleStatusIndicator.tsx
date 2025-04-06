"use client";

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import {
  Hyppoland_FREE_NFT_CONTRACT_ABI,
  Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
  Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
  Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS,
} from "@/constants/contracts";

interface RaffleStatusIndicatorProps {
  contractType: "nft" | "free";
}

export const RaffleStatusIndicator = ({
  contractType,
}: RaffleStatusIndicatorProps) => {
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [ticketsCount, setTicketsCount] = useState<string>("0");
  const [isActive, setIsActive] = useState<boolean | null>(null);

  const { data: nftRaffleEnded } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "raffleEnded",
  }) as { data: boolean };

  const { data: nftRemainingTime } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "getRemainingTime",
  }) as { data: bigint };

  const { data: nftTotalEntries } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "totalEntries",
  }) as { data: bigint };

  const { data: freeRaffleStatus } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "raffleStatus",
  }) as { data: boolean };

  const { data: freeRemainingTime } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "getRemainingTimeSec",
  }) as { data: bigint };

  const { data: freeTicketsSold } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "ticketsSoldThisRound",
  }) as { data: bigint };

  useEffect(() => {
    if (contractType === "nft") {
      setIsActive(nftRaffleEnded !== undefined ? !nftRaffleEnded : null);

      if (nftRemainingTime !== undefined) {
        const totalSeconds = Number(nftRemainingTime);
        if (totalSeconds <= 0) {
          setRemainingTime("Ended");
        } else {
          const days = Math.floor(totalSeconds / (24 * 60 * 60));
          const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
          const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
          setRemainingTime(`${days}d ${hours}h ${minutes}m`);
        }
      }

      if (nftTotalEntries !== undefined) {
        setTicketsCount(nftTotalEntries.toString());
      }
    } else {
      setIsActive(freeRaffleStatus !== undefined ? freeRaffleStatus : null);

      if (freeRemainingTime !== undefined) {
        const totalSeconds = Number(freeRemainingTime);
        if (totalSeconds <= 0) {
          setRemainingTime("Ended");
        } else {
          const days = Math.floor(totalSeconds / (24 * 60 * 60));
          const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
          const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
          setRemainingTime(`${days}d ${hours}h ${minutes}m`);
        }
      }

      if (freeTicketsSold !== undefined) {
        setTicketsCount(freeTicketsSold.toString());
      }
    }
  }, [
    contractType,
    nftRaffleEnded,
    nftRemainingTime,
    nftTotalEntries,
    freeRaffleStatus,
    freeRemainingTime,
    freeTicketsSold,
  ]);

  return (
    <div className="my-2 bg-zinc-800/60 rounded-md p-3 flex flex-col md:flex-row gap-4 items-center">
      <div className="flex items-center">
        <div
          className={`h-3 w-3 rounded-full mr-2 ${
            isActive === null
              ? "bg-gray-500"
              : isActive
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
        <span className="text-sm font-medium">
          Status:{" "}
          {isActive === null ? "Loading..." : isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-sm">
          Time Remaining: {remainingTime || "Loading..."}
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-sm">Tickets Sold: {ticketsCount}</span>
      </div>
    </div>
  );
};

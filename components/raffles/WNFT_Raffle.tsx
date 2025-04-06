"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
  Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS,
} from "@/constants/contracts";
import { formatEther, parseGwei } from "viem";
import Image from "next/image";

const WNFT_Raffle = () => {
  const { address } = useAccount();
  const [numberOfTickets, setNumberOfTickets] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const { data: minimumEntryFee } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "minimumEntryFee",
  }) as { data: bigint };

  const { data: raffleEnded } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "raffleEnded",
  }) as { data: boolean };

  const { data: nftContract } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "nftContract",
  }) as { data: `0x${string}` };

  const { data: singleNftId } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "nftIds",
    args: [0],
  }) as { data: bigint };

  const { data: allNftIds } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "nftIds",
  }) as { data: bigint[] };

  const { data: remainingTimeData } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "getRemainingTime",
  }) as { data: bigint };

  const { data: totalEntries, refetch: refetchTotalEntries } = useReadContract({
    address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
    functionName: "totalEntries",
  }) as { data: bigint; refetch: () => Promise<{ data: bigint }> };

  useEffect(() => {
    const updateRemainingTime = () => {
      if (remainingTimeData !== undefined) {
        const totalSeconds = Number(remainingTimeData);
        if (totalSeconds <= 0) {
          setRemaining({ days: 0, hours: 0, minutes: 0 });
          return;
        }

        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);

        setRemaining({ days, hours, minutes });
      }
    };

    const interval = setInterval(updateRemainingTime, 60000);
    updateRemainingTime();

    return () => clearInterval(interval);
  }, [remainingTimeData]);

  const {
    data: hash,
    isPending,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success("Tickets purchased!");
        setIsLoading(false);
        refetchTotalEntries();
      },
      onError: (err) => {
        const errorMessage = err?.message || "";
        const shortError = errorMessage.includes("User denied")
          ? "User rejected the request"
          : errorMessage.split(".")[0] || "Unknown error";

        toast.error(`Failed to buy tickets: ${shortError}`);
        setIsLoading(false);
      },
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    let toastId: string | undefined;

    if (isConfirming) {
      toastId = toast.loading("Processing transaction...");
    }

    if (isConfirmed) {
      if (toastId) toast.dismiss(toastId);
      toast.success("Tickets purchased!");

      refetchTotalEntries();
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isConfirming, isConfirmed, refetchTotalEntries]);

  const calculateTotalPrice = () => {
    if (!minimumEntryFee || !numberOfTickets || parseInt(numberOfTickets) <= 0)
      return "0";
    return formatEther(minimumEntryFee * BigInt(parseInt(numberOfTickets)));
  };

  const buyTickets = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!numberOfTickets || parseInt(numberOfTickets) <= 0) {
      toast.error("Please enter a valid number of tickets");
      return;
    }

    setIsLoading(true);
    try {
      const ticketCount = parseInt(numberOfTickets);
      const totalPrice = minimumEntryFee
        ? minimumEntryFee * BigInt(ticketCount)
        : BigInt(0);

      await writeContractAsync({
        address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
        abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
        functionName: "buyEntry",
        args: [ticketCount],
        value: totalPrice,
        gas: BigInt(1500000),
        gasPrice: parseGwei("0.2"),
      });
    } catch {
      setIsLoading(false);
    }
  };

  const featuredNftId =
    singleNftId ||
    (Array.isArray(allNftIds) && allNftIds.length > 0 ? allNftIds[0] : null);

  const getNftImageUrl = (nftId: bigint) => {
    return nftContract === "0x4A84cF3660D7DFFf869151Fd6DE8F4690c6d8b71"
      ? `https://bafybeifhqoqwtxiultgggtnnbkysqwh73yml467djeas2cbpgkmtwpemxa.ipfs.dweb.link/${nftId}.png`
      : `https://nft.hyppoland.com/nft/${nftContract}/${nftId}`;
  };

  return (
    <div className="max-w-xs rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden">
      <div className="relative px-3 py-2 border-b border-zinc-700 bg-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">NFT Raffle</h2>
          <div className="flex items-center space-x-1.5">
            <div
              className={`h-2 w-2 rounded-full ${
                raffleEnded ? "bg-red-500" : "bg-green-500"
              }`}
            />
            <span className="text-xs text-gray-400">
              {raffleEnded ? "Ended" : "Active"}
            </span>
          </div>
        </div>
      </div>

      {nftContract && featuredNftId && (
        <div className="relative aspect-square w-full">
          <Image
            src={getNftImageUrl(featuredNftId)}
            alt={`Featured NFT #${featuredNftId.toString()}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />

          <div className="absolute top-3 right-3">
            <p className="text-xs bg-zinc-700/80 rounded-md px-2 py-1 text-gray-300">
              {totalEntries ? Number(totalEntries) : 0} tickets sold
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-300">NFT ID</p>
              <p className="text-sm font-mono text-white">
                #{featuredNftId.toString()}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {Array.isArray(allNftIds) && allNftIds.length > 1 && (
                <p className="text-xs text-white bg-blue-600 rounded-md px-1.5 py-0.5">
                  +{allNftIds.length - 1} more
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-3 space-y-3">
        <div className="bg-zinc-800/50 rounded-md p-2.5">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-1">
              <p className="text-xs text-gray-400">Ends in:</p>
              {raffleEnded && (
                <p className="text-xs font-medium text-gray-400">Ended</p>
              )}
            </div>
            <div className="flex w-full justify-around">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-white bg-zinc-800 w-10 h-10 flex items-center justify-center rounded-md">
                  {remaining.days}
                </div>
                <div className="text-xs text-gray-400 mt-1">days</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-white bg-zinc-800 w-10 h-10 flex items-center justify-center rounded-md">
                  {remaining.hours}
                </div>
                <div className="text-xs text-gray-400 mt-1">hours</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-white bg-zinc-800 w-10 h-10 flex items-center justify-center rounded-md">
                  {remaining.minutes}
                </div>
                <div className="text-xs text-gray-400 mt-1">min</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Entry Fee:</p>
            <p className="text-xs font-mono text-white">
              {minimumEntryFee ? formatEther(minimumEntryFee) : "..."} HYPE
            </p>
          </div>

          <div className="flex gap-1.5">
            <Input
              type="number"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(e.target.value)}
              placeholder="Ticket quantity"
              min="1"
              className="flex-1 h-8 text-xs bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-gray-400"
              onClick={() => setNumberOfTickets("5")}>
              5
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs bg-zinc-800 border-zinc-700 text-gray-400"
              onClick={() => setNumberOfTickets("10")}>
              10
            </Button>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-md p-2 flex justify-between items-center">
          <p className="text-xs text-gray-400">Total:</p>
          <p className="text-base font-mono font-bold text-white">
            {calculateTotalPrice()} HYPE
          </p>
        </div>

        <Button
          onClick={buyTickets}
          disabled={
            isPending ||
            !address ||
            !numberOfTickets ||
            isLoading ||
            raffleEnded
          }
          className="w-full bg-[#AFFF81] hover:bg-[#AFFF81]/80 h-9 text-black text-sm cursor-pointer">
          {isPending || isLoading ? "Processing..." : "Buy Tickets"}
        </Button>
      </div>
    </div>
  );
};

export default WNFT_Raffle;

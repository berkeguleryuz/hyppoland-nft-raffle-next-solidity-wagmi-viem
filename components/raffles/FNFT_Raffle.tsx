"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
  useReadContract,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  Hyppoland_FREE_NFT_CONTRACT_ABI,
  Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
  ERC721_CONTRACT_ABI,
} from "@/constants/contracts";
import { formatEther, parseGwei } from "viem";
import Image from "next/image";

const FNFT_Raffle = () => {
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const { data: prizeAmount } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "prizeAmount",
  }) as { data: bigint };

  const { data: raffleStatus } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "raffleStatus",
  }) as { data: boolean };

  const { data: ticketsSold, refetch: refetchTicketsSold } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "ticketsSoldThisRound",
  }) as { data: bigint; refetch: () => Promise<{ data: bigint }> };

  const { data: hasEnteredData, refetch: refetchHasEntered } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "hasEntered",
    args: address ? [address as `0x${string}`] : undefined,
  }) as { data: boolean; refetch: () => Promise<{ data: boolean }> };

  const { data: remainingTimeData, refetch: refetchRemainingTime } =
    useReadContract({
      address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
      functionName: "getRemainingTimeSec",
    }) as { data: bigint; refetch: () => Promise<{ data: bigint }> };

  const { data: nftContract } = useReadContract({
    address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
    functionName: "nftContract",
  }) as { data: `0x${string}` };

  const { data: hasNft } = useReadContract({
    address:
      nftContract &&
      nftContract !== "0x0000000000000000000000000000000000000000"
        ? (nftContract as `0x${string}`)
        : undefined,
    abi: ERC721_CONTRACT_ABI,
    functionName: "balanceOf",
    args: address && nftContract ? [address as `0x${string}`] : undefined,
  }) as { data: bigint };

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
        toast.success("Free ticket request submitted!");
        setIsLoading(false);
        refetchTicketsSold();
        refetchHasEntered();
        refetchRemainingTime();
      },
      onError: (err) => {
        const errorMessage = err?.message || "";
        const shortError = errorMessage.includes("User denied")
          ? "User rejected the request"
          : errorMessage.split(".")[0] || "Unknown error";

        toast.error(`Failed to get free ticket: ${shortError}`);
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
      toast.success("Ticket acquired!");

      refetchTicketsSold();
      refetchHasEntered();
      refetchRemainingTime();
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [
    isConfirming,
    isConfirmed,
    refetchTicketsSold,
    refetchHasEntered,
    refetchRemainingTime,
  ]);

  const getFreeTicket = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (hasEnteredData) {
      toast.error("You have already claimed your free ticket");
      return;
    }

    if (
      !nftContract ||
      nftContract === "0x0000000000000000000000000000000000000000"
    ) {
      toast.error("NFT contract is not set up yet");
      return;
    }

    if (!hasNft || hasNft === BigInt(0)) {
      toast.error("You need to own at least one NFT to participate");
      return;
    }

    setIsLoading(true);
    try {
      await writeContractAsync({
        address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
        functionName: "getFreeTicket",
        gas: BigInt(1500000),
        gasPrice: parseGwei("0.2"),
      });
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xs w-full rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden">
      <div className="relative px-3 py-2 border-b border-zinc-700 bg-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Free Raffle</h2>
          <div className="flex items-center space-x-1.5">
            <div
              className={`h-2 w-2 rounded-full ${
                !raffleStatus ? "bg-red-500" : "bg-green-500"
              }`}
            />
            <span className="text-xs text-gray-400">
              {!raffleStatus ? "Ended" : "Active"}
            </span>
          </div>
        </div>
      </div>

      <div className="relative aspect-square w-full bg-zinc-800 flex flex-col items-center justify-center">
        <Image
          src="/bg.jpg"
          alt="Free Raffle Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70" />

        <div className="absolute top-3 right-3">
          <p className="text-xs bg-zinc-700/80 rounded-md px-2 py-1 text-gray-300">
            {ticketsSold ? Number(ticketsSold) : 0} tickets sold
          </p>
        </div>

        <div className="bg-zinc-800/60 p-6 rounded-2xl flex flex-col items-center z-10">
          <p className="text-sm text-gray-400 mb-2">Prize Pool</p>
          <p className="text-4xl font-bold text-white mb-2">
            {prizeAmount ? formatEther(prizeAmount) : "0"}
          </p>
          <p className="text-xl font-medium text-white">HYPE</p>
        </div>

        <div className="absolute bottom-4 left-0 right-0 mx-auto text-center z-10">
          <p className="text-xs text-gray-400">Free entry, real rewards!</p>
        </div>
      </div>

      <div className="p-3 space-y-3">
        <div className="bg-zinc-800/50 rounded-md p-2.5">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-1">
              <p className="text-xs text-gray-400">Ends in:</p>
              {!raffleStatus && (
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

        <Button
          onClick={getFreeTicket}
          disabled={isPending || !address || isLoading || !raffleStatus}
          className="w-full bg-[#AFFF81] hover:bg-[#AFFF81]/80 h-9 text-black text-sm cursor-pointer">
          {isPending || isLoading ? "Processing..." : "Get Free Ticket"}
        </Button>
      </div>
    </div>
  );
};

export default FNFT_Raffle;

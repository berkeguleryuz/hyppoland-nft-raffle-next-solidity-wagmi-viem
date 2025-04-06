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
import { formatEther } from "viem";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const CountdownItem = ({ num, text }: { num: number; text: string }) => {
  return (
    <div className="font-sans text-white border-dashed rounded-full w-1/3 h-24 md:h-36 flex flex-col md:gap-2 items-center justify-center divide-y-2 divide-white border-white">
      <div className="w-full text-center relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          {num > 0 ? (
            <motion.span
              key={num}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ ease: "backIn", duration: 0.75 }}
              className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-white font-medium">
              {num}
            </motion.span>
          ) : (
            <div className="font-sans block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-white font-medium">
              0
            </div>
          )}
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm lg:text-base font-light text-white">
        {text}
      </span>
    </div>
  );
};

const WNFT_Raffle = () => {
  const { address } = useAccount();
  const [numberOfTickets, setNumberOfTickets] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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

  useEffect(() => {
    const updateRemainingTime = () => {
      if (remainingTimeData !== undefined) {
        const totalSeconds = Number(remainingTimeData);
        if (totalSeconds <= 0) {
          setRemaining({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          });
          return;
        }

        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        setRemaining({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    };

    const interval = setInterval(updateRemainingTime, 1000);
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
        toast.success("Ticket purchase transaction submitted");
        setIsLoading(false);
      },
      onError: (err) => {
        console.error("Transaction error:", err);
        toast.error(
          "Failed to buy tickets: " + (err?.message || "Unknown error"),
        );
        setIsLoading(false);
      },
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

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

      const config = {
        address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
        abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
        functionName: "buyEntry",
        args: [ticketCount],
        value: totalPrice,
      };

      console.log("Buying tickets with config:", config);
      await writeContractAsync(config);
    } catch (err) {
      console.error("Buy tickets error:", err);
      toast.error("Failed to buy tickets");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg border max-w-lg border-zinc-700 bg-zinc-900 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Buy Raffle Tickets</h2>

      {nftContract && (
        <div className="p-3 bg-zinc-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Raffle NFTs:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {singleNftId && !Array.isArray(allNftIds) && (
              <div className="space-y-3">
                <div className="aspect-square w-full relative rounded-lg overflow-hidden">
                  {nftContract ===
                  "0x4A84cF3660D7DFFf869151Fd6DE8F4690c6d8b71" ? (
                    <Image
                      src={`https://bafybeifhqoqwtxiultgggtnnbkysqwh73yml467djeas2cbpgkmtwpemxa.ipfs.dweb.link/${singleNftId}.png`}
                      alt={`Raffle NFT #${singleNftId.toString()}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-700 aspect-square rounded-lg" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Contract:</p>
                    <p
                      className="text-sm font-mono text-white truncate max-w-[150px]"
                      title={nftContract}>
                      {nftContract}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Token ID:</p>
                    <p className="text-sm font-mono text-white">
                      #{singleNftId.toString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {Array.isArray(allNftIds) &&
              allNftIds.map((nftId, index) => (
                <div key={index} className="space-y-3">
                  <div className="aspect-square w-full relative rounded-lg overflow-hidden">
                    <Image
                      src={
                        nftContract ===
                        "0x4A84cF3660D7DFFf869151Fd6DE8F4690c6d8b71"
                          ? `https://bafybeifhqoqwtxiultgggtnnbkysqwh73yml467djeas2cbpgkmtwpemxa.ipfs.dweb.link/${nftId}.png`
                          : `https://nft.hyppoland.com/nft/${nftContract}/${nftId}`
                      }
                      alt={`Raffle NFT #${nftId.toString()}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Contract:</p>
                      <p
                        className="text-sm font-mono text-white truncate max-w-[150px]"
                        title={nftContract}>
                        {nftContract}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Token ID:</p>
                      <p className="text-sm font-mono text-white">
                        #{nftId.toString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="p-3 bg-zinc-800 rounded-lg">
        <p className="text-sm text-gray-400">Raffle Status:</p>
        <p className="text-sm font-mono text-white">
          {raffleEnded ? "Ended" : "Active"}
        </p>
      </div>

      <div className="p-3 bg-zinc-800 rounded-lg">
        <p className="text-sm text-gray-400 mb-4">Time Remaining:</p>
        <div className="w-full max-w-md gap-5 mx-auto flex items-center justify-center">
          <CountdownItem num={remaining.days} text="days" />
          <CountdownItem num={remaining.hours} text="hours" />
          <CountdownItem num={remaining.minutes} text="minutes" />
        </div>
      </div>

      <div className="p-3 bg-zinc-800 rounded-lg">
        <p className="text-sm text-gray-400">Connected Wallet:</p>
        <p className="text-sm font-mono text-white">
          {address ? address : "Not connected"}
        </p>
      </div>

      <div className="p-3 bg-zinc-800 rounded-lg">
        <p className="text-sm text-gray-400">Minimum Entry Fee:</p>
        <p className="text-sm font-mono text-white">
          {minimumEntryFee ? formatEther(minimumEntryFee) : "Loading..."} HYPE
          per ticket
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Number of Tickets</label>
        <Input
          type="number"
          value={numberOfTickets}
          onChange={(e) => setNumberOfTickets(e.target.value)}
          placeholder="1"
          min="1"
          className="w-full bg-zinc-800 border-zinc-700"
        />
        <p className="text-xs text-gray-500">
          How many tickets you want to buy
        </p>
      </div>

      <div className="p-3 bg-zinc-800 rounded-lg">
        <p className="text-sm text-gray-400">Total Price:</p>
        <p className="text-sm font-mono text-white">
          {calculateTotalPrice()} HYPE
        </p>
      </div>

      <Button
        onClick={buyTickets}
        disabled={
          isPending || !address || !numberOfTickets || isLoading || raffleEnded
        }
        className="w-full bg-blue-600 hover:bg-blue-700 mt-auto">
        {isPending || isLoading ? "Buying..." : "Buy Tickets"}
      </Button>

      {isConfirming && (
        <p className="text-sm text-yellow-400">Waiting for confirmation...</p>
      )}
      {isConfirmed && (
        <p className="text-sm text-green-400">
          Tickets purchased successfully!
        </p>
      )}
    </div>
  );
};

export default WNFT_Raffle;

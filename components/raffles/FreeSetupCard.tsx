"use client";

import { useState } from "react";
import { useWriteContract } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  Hyppoland_FREE_NFT_CONTRACT_ABI,
  Hyppoland_FREE_NFT_CONTRACT_ADDRESS,
} from "@/constants/contracts";
import { parseEther } from "viem";

const FreeSetupCard = () => {
  const [prizeAmount, setPrizeAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { writeContractAsync: startRaffleWrite } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success("Raffle started successfully!");
        setIsLoading(false);
        setPrizeAmount("");
        setDuration("");
      },
      onError: (err) => {
        console.error("Start raffle error:", err);
        toast.error("Failed to start raffle");
        setIsLoading(false);
      },
    },
  });

  const { writeContractAsync: depositFundsWrite } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success("Funds deposited successfully!");
        setIsLoading(false);
        setDepositAmount("");
      },
      onError: (err) => {
        console.error("Deposit funds error:", err);
        toast.error("Failed to deposit funds");
        setIsLoading(false);
      },
    },
  });

  const handleStartRaffle = async () => {
    if (!prizeAmount || !duration) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const config = {
        address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
        functionName: "startRaffle",
        args: [parseEther(prizeAmount), BigInt(duration)],
      };

      await startRaffleWrite(config);
    } catch (err) {
      console.error("Start raffle error:", err);
      toast.error("Failed to start raffle");
      setIsLoading(false);
    }
  };

  const handleDepositFunds = async () => {
    if (!depositAmount) {
      toast.error("Please enter deposit amount");
      return;
    }

    setIsLoading(true);
    try {
      const config = {
        address: Hyppoland_FREE_NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: Hyppoland_FREE_NFT_CONTRACT_ABI,
        functionName: "initialDeposit",
        value: parseEther(depositAmount),
      };

      await depositFundsWrite(config);
    } catch (err) {
      console.error("Deposit funds error:", err);
      toast.error("Failed to deposit funds");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg border border-zinc-700 bg-zinc-900 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Start Free Raffle</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Prize Amount (HYPE)
            </label>
            <Input
              type="number"
              step="0.01"
              value={prizeAmount}
              onChange={(e) => setPrizeAmount(e.target.value)}
              placeholder="0.1"
              min="0.001"
              className="w-full bg-zinc-800 border-zinc-700"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Duration (minutes)
            </label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="60"
              className="w-full bg-zinc-800 border-zinc-700"
            />
          </div>
          <Button
            onClick={handleStartRaffle}
            disabled={isLoading || !prizeAmount || !duration}
            className="w-full bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Starting..." : "Start Raffle"}
          </Button>
        </div>
      </div>

      <div className="border-t border-zinc-700 pt-6">
        <h2 className="text-xl font-bold text-white mb-4">Initial Deposit</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">
              Amount (HYPE)
            </label>
            <Input
              type="number"
              step="0.01"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="0.1"
              className="w-full bg-zinc-800 border-zinc-700"
            />
          </div>
          <Button
            onClick={handleDepositFunds}
            disabled={isLoading || !depositAmount}
            className="w-full bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Depositing..." : "Deposit Funds"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeSetupCard;

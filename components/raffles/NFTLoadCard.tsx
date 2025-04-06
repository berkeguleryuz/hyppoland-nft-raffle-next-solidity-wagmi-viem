"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
  Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS,
} from "@/constants/contracts";

export const NFTLoadCard = () => {
  const { address } = useAccount();
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [nftIds, setNftIds] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: hash,
    isPending,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success("NFTs loading transaction submitted");
        setIsLoading(false);
      },
      onError: (err) => {
        console.error("Transaction error:", err);
        toast.error(
          "Failed to load NFTs: " + (err?.message || "Unknown error"),
        );
        setIsLoading(false);
      },
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    let toastId: string | undefined;

    if (isConfirming) {
      toastId = toast.loading("Loading NFTs...");
    }

    if (isConfirmed) {
      if (toastId) toast.dismiss(toastId);
      toast.success("NFTs loaded successfully!");
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isConfirming, isConfirmed]);

  const validateAndParseNftIds = (ids: string): number[] | null => {
    try {
      const parsedIds = ids
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== "")
        .map((id) => {
          const num = parseInt(id);
          if (isNaN(num) || num < 0) {
            throw new Error(`Invalid NFT ID: ${id}`);
          }
          return num;
        });

      if (parsedIds.length === 0) {
        toast.error("Please enter at least one NFT ID");
        return null;
      }

      return parsedIds;
    } catch (error) {
      console.error("Error parsing NFT IDs:", error);
      toast.error(
        "Invalid NFT IDs. Please enter positive numbers separated by commas",
      );
      return null;
    }
  };

  const loadNFTs = async () => {
    if (!nftContractAddress) {
      toast.error("Please enter NFT contract address");
      return;
    }

    if (!nftIds) {
      toast.error("Please enter NFT IDs");
      return;
    }

    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    const parsedIds = validateAndParseNftIds(nftIds);
    if (!parsedIds) return;

    setIsLoading(true);
    try {
      const config = {
        address: Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS as `0x${string}`,
        abi: Hyppoland_NFT_RAFFLE_CONTRACT_ABI,
        functionName: "loadNFTs",
        args: [nftContractAddress, parsedIds],
      };

      await writeContractAsync(config);
    } catch (err) {
      console.error("Load NFTs error:", err);
      toast.error("Failed to load NFTs");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg border border-zinc-700 bg-zinc-900 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">Load NFTs</h2>

      <div className="p-3 bg-zinc-800 rounded-lg">
        <p className="text-sm text-gray-400">Target Contract (Raffle):</p>
        <p className="text-sm font-mono text-white break-all">
          {Hyppoland_NFT_RAFFLE_CONTRACT_ADDRESS}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">NFT Contract Address</label>
        <Input
          value={nftContractAddress}
          onChange={(e) => setNftContractAddress(e.target.value)}
          placeholder="0x... Hyypos NFT Contract"
          className="w-full bg-zinc-800 border-zinc-700"
        />
        <p className="text-xs text-gray-500">
          The contract address of the NFTs to load
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">NFT IDs</label>
        <Input
          value={nftIds}
          onChange={(e) => setNftIds(e.target.value)}
          placeholder="1, 2, 3..."
          className="w-full bg-zinc-800 border-zinc-700"
        />
        <p className="text-xs text-gray-500">
          Enter NFT IDs separated by commas (only positive numbers)
        </p>
      </div>

      <Button
        onClick={loadNFTs}
        disabled={isPending || !address || !nftContractAddress || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 mt-auto">
        {isPending || isLoading ? "Loading NFTs..." : "Load NFTs"}
      </Button>
    </div>
  );
};

export default NFTLoadCard;

"use client";

import { useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { ERC721_CONTRACT_ABI } from "@/constants/contracts";

export const NFTApprovalCard = () => {
  const { address } = useAccount();
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [operatorAddress, setOperatorAddress] = useState("");
  const [isApproving, setIsApproving] = useState(false);

  const {
    data: hash,
    isPending,
    writeContractAsync,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toast.success("Transaction submitted successfully");
        setIsApproving(false);
      },
      onError: (err) => {
        console.error("Transaction error:", err);
        toast.error("Transaction failed: " + (err?.message || "Unknown error"));
        setIsApproving(false);
      },
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const approveNFTs = async () => {
    if (!nftContractAddress) {
      toast.error("Please enter NFT contract address");
      return;
    }

    if (!operatorAddress) {
      toast.error("Please enter operator address");
      return;
    }

    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsApproving(true);
    try {
      const config = {
        address: nftContractAddress as `0x${string}`,
        abi: ERC721_CONTRACT_ABI,
        functionName: "setApprovalForAll",
        args: [operatorAddress, true],
      };

      console.log("Sending approval transaction with config:", config);
      await writeContractAsync(config);
    } catch (err) {
      console.error("Approval error:", err);
      toast.error("Failed to send approval transaction");
      setIsApproving(false);
    }
  };

  return (
    <div className="p-6 rounded-lg border border-zinc-700 bg-zinc-900 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-white">NFT Approval</h2>

      <div className="p-3 bg-zinc-800 rounded-lg">
        <p className="text-sm text-gray-400">Connected Wallet:</p>
        <p className="text-sm font-mono text-white">
          {address ? address : "Not connected"}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">NFT Contract Address</label>
        <Input
          value={nftContractAddress}
          onChange={(e) => setNftContractAddress(e.target.value)}
          placeholder="0x..."
          className="w-full bg-zinc-800 border-zinc-700"
        />
        <p className="text-xs text-gray-500">
          The NFT contract address that contains the setApprovalForAll function
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">
          Operator Address to Approve
        </label>
        <Input
          value={operatorAddress}
          onChange={(e) => setOperatorAddress(e.target.value)}
          placeholder="0x..."
          className="w-full bg-zinc-800 border-zinc-700"
        />
        <p className="text-xs text-gray-500 max-w-sm">
          You need to approve your address, contract address and nft contract
          address (if first time)
        </p>
      </div>

      <Button
        onClick={approveNFTs}
        disabled={isPending || !address || !nftContractAddress || isApproving}
        className="w-full bg-blue-600 hover:bg-blue-700 mt-auto">
        {isPending || isApproving ? "Approving..." : "Approve NFTs"}
      </Button>

      {isConfirming && (
        <p className="text-sm text-yellow-400">Waiting for confirmation...</p>
      )}
      {isConfirmed && (
        <p className="text-sm text-green-400">Approval successful!</p>
      )}
    </div>
  );
};

export default NFTApprovalCard;

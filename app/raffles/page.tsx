import React from "react";
import FNFT_Raffle from "@/components/raffles/FNFT_Raffle";
import WNFT_Raffle from "@/components/raffles/WNFT_Raffle";
import { Header } from "@/components/Header";

export default function RafflesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto py-24">
        <h1 className="text-3xl font-bold text-center mb-10">Active Raffles</h1>
        <div className="flex flex-wrap justify-center gap-6">
          <FNFT_Raffle />
          <WNFT_Raffle />
        </div>
      </div>
    </div>
  );
} 
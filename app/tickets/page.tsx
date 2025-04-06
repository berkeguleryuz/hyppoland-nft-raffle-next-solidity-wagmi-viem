import React from "react";
import { Header } from "@/components/Header";
import WNFT_Raffle from "@/components/raffles/WNFT_Raffle";
import FNFT_Raffle from "@/components/raffles/FNFT_Raffle";
const TicketsPage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="container gap-2 mx-auto py-24 flex flex-row items-center">
        <WNFT_Raffle />
        <FNFT_Raffle />
      </div>
    </div>
  );
};

export default TicketsPage;

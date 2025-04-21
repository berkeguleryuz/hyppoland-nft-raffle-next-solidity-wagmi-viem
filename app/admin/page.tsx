"use client";
import { Header } from "@/components/Header";
import NFTRaffleAdminSetup from "@/components/raffles/NFTRaffleAdminSetup";
import React from "react";
import { useAccount } from "wagmi";
import NotFound from "../not-found";
const AdminPage = () => {
  const { address } = useAccount();
  const authorizedAddress = [
    "0x45938318f986bE73B1f630d2a7F809EFc5672C57",
    "0x5558F7a27f7eEDD9462764fc8db665F1A6ef6796",
  ];

  if (!authorizedAddress.includes(address as string)) {
    return <NotFound />;
  }

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-black text-white items-center justify-center flex">
        <NFTRaffleAdminSetup />
      </div>
    </div>
  );
};

export default AdminPage;

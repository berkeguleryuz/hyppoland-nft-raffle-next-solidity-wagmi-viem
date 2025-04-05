import { Header } from "@/components/Header";
import NFTRaffleAdminSetup from "@/components/raffles/NFTRaffleAdminSetup";
import React from "react";

const AdminPage = () => {
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

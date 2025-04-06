"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center items-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#AFFF81]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-60 h-60 bg-[#AFFF81]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-[#AFFF81]/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-0 mb-8"
        animate={{
          x: position.x,
          y: position.y,
          rotate: position.x * 0.05,
        }}
        transition={{ type: "spring", stiffness: 100 }}>
        <Image
          src="https://static.drip.trade/collections/hyppos_pfp.png"
          alt="Hyppo 404"
          width={180}
          height={180}
          className="rounded-xl"
        />
        <div className="absolute -top-8 -right-12 bg-zinc-800 px-4 py-2 rounded-full border border-zinc-700 shadow-lg">
          <p className="font-bold text-[#AFFF81] text-sm">Oops!</p>
        </div>
      </motion.div>

      <h1 className="text-7xl font-extrabold text-white mb-2">
        <span className="text-[#AFFF81]">4</span>0
        <span className="text-[#AFFF81]">4</span>
      </h1>

      <h2 className="text-xl text-white mb-6 text-center">
        This page has gone on a vacation
      </h2>

      <p className="text-zinc-400 text-center max-w-md mb-8">
        We&apos;ve searched high and low, but couldn&apos;t find the page
        you&apos;re looking for. It might have been moved, renamed, or never
        existed in the first place.
      </p>

      <div className="flex z-100 cursor-pointer">
        <Link href="/" className="z-30 cursor-pointer">
          <Button className="bg-[#AFFF81] hover:bg-[#AFFF81]/80 text-black font-medium">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

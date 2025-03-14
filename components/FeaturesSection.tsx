"use client";

import React from "react";
import { CloudLightning, LockIcon, UsersIcon } from "lucide-react";
const features = [
  {
    title: "Secure Raffles",
    description:
      "Built on blockchain technology ensuring transparency and fairness",
    icon: <LockIcon className="size-6 text-[#AFFF81]" />,
  },
  {
    title: "Instant Rewards",
    description: "Automatic prize distribution through smart contracts",
    icon: <CloudLightning className="size-6 text-[#AFFF81]" />,
  },
  {
    title: "Community First",
    description: "Active community governance and regular events",
    icon: <UsersIcon className="size-6 text-[#AFFF81]" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-6 py-20 bg-[#AFFF81]/5">
      <h2 className="text-4xl font-bold text-center mb-16">
        Why Choose <span className="text-[#AFFF81]">Us</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="bg-black p-8 rounded-lg hover:shadow-[#AFFF81] hover:shadow-[0_0_10px_#AFFF81] transition-colors">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-lime-100">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

export const hyperliquid = defineChain({
  id: 999,
  name: "Hyperliquid",
  network: "hyperliquid",
  nativeCurrency: {
    decimals: 18,
    name: "Hyperliquid",
    symbol: "HYPE",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.hyperliquid.xyz/evm"],
    },
    public: {
      http: ["https://rpc.hyperliquid.xyz/evm"],
    },
  },
});

export const config = getDefaultConfig({
  appName: "HyppoLand",
  projectId: "YOUR_PROJECT_ID",
  chains: [hyperliquid],
  ssr: true,
});

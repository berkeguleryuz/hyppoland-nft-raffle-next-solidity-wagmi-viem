"use client";

import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";

import { config } from "../wagmi";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const myCustomTheme: Theme = {
    blurs: {
      modalOverlay: "blur(0px)",
    },
    colors: {
      accentColor: "#AFFF81",
      accentColorForeground: "#252525",
      actionButtonBorder: "#AFFF81",
      actionButtonBorderMobile: "#AFFF81",
      actionButtonSecondaryBackground: "#AFFF81",
      closeButton: "#252525",
      closeButtonBackground: "#AFFF81",
      connectButtonBackground: "#AFFF81",
      connectButtonBackgroundError: "#AFFF81",
      connectButtonInnerBackground: "#AFFF81",
      connectButtonText: "#252525",
      connectButtonTextError: "#252525",
      connectionIndicator: "#AFFF81",
      downloadBottomCardBackground: "#AFFF81",
      downloadTopCardBackground: "#AFFF81",
      error: "#AFFF81",
      generalBorder: "#AFFF81",
      generalBorderDim: "#AFFF81",
      menuItemBackground: "#AFFF81",
      modalBackdrop: "rgba(0, 0, 0, 0.5)",
      modalBackground: "#AFFF81",
      modalBorder: "#AFFF81",
      modalText: "#252525",
      modalTextDim: "#252525",
      modalTextSecondary: "#252525",
      profileAction: "#AFFF81",
      profileActionHover: "#90EE90",
      profileForeground: "#AFFF81",
      selectedOptionBorder: "#AFFF81",
      standby: "#AFFF81",
    },
    fonts: {
      body: "Geist",
    },
    radii: {
      actionButton: "0px",
      connectButton: "0px",
      menuButton: "9999px",
      modal: "24px",
      modalMobile: "28px",
    },
    shadows: {
      connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
      profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
      selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
      selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
      walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
    },
  };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myCustomTheme} locale="en">
          {children}
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

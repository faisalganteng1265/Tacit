"use client";

import "@mysten/dapp-kit/dist/index.css";

import { getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";
import { createNetworkConfig, SuiClientProvider, WalletProvider, type ThemeVars } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

import { ToastProvider } from "@/components/ToastProvider";

const SUI_NETWORK = (process.env.NEXT_PUBLIC_SUI_NETWORK ?? "testnet") as
  | "testnet"
  | "mainnet"
  | "devnet";

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getJsonRpcFullnodeUrl("mainnet"), network: "mainnet" },
  testnet: { url: getJsonRpcFullnodeUrl("testnet"), network: "testnet" },
  devnet: { url: getJsonRpcFullnodeUrl("devnet"), network: "devnet" },
});

const tacitDarkTheme: ThemeVars = {
  blurs: { modalOverlay: "blur(4px)" },
  backgroundColors: {
    primaryButton: "#2dd4bf",
    primaryButtonHover: "#22d3ee",
    outlineButtonHover: "rgba(45,212,191,0.08)",
    walletItemHover: "rgba(45,212,191,0.08)",
    walletItemSelected: "rgba(45,212,191,0.14)",
    modalOverlay: "rgba(2,6,8,0.7)",
    modalPrimary: "#050607",
    modalSecondary: "#0d1114",
    iconButton: "transparent",
    iconButtonHover: "rgba(45,212,191,0.1)",
    dropdownMenu: "#050607",
    dropdownMenuSeparator: "#1f2937",
  },
  borderColors: { outlineButton: "rgba(96,165,250,0.24)" },
  colors: {
    primaryButton: "#021011",
    outlineButton: "#d1d5db",
    iconButton: "#d1d5db",
    body: "#d1d5db",
    bodyMuted: "#8b95a3",
    bodyDanger: "#f87171",
  },
  radii: { small: "4px", medium: "6px", large: "7px", xlarge: "10px" },
  shadows: {
    primaryButton: "0 0 22px rgba(45,212,191,0.26)",
    walletItemSelected: "0 0 16px rgba(45,212,191,0.1)",
  },
  fontWeights: { normal: "400", medium: "600", bold: "700" },
  fontSizes: { small: "11px", medium: "12px", large: "13px", xlarge: "15px" },
  typography: {
    fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
    fontStyle: "normal",
    lineHeight: "1.4",
    letterSpacing: "0.02em",
  },
};

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={SUI_NETWORK}>
        <WalletProvider autoConnect theme={tacitDarkTheme}>
          <ToastProvider>{children}</ToastProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

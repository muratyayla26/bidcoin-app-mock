"use client";

import web3AuthContextConfig from "@/config/web3auth-config";
import { Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { ReactNode } from "react";

export const Web3AuthProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      {children}
    </Web3AuthProvider>
  );
};

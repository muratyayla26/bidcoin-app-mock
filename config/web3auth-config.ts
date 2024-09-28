import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { chain } from "./chain-config";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";

export const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string;

const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: {
    chainConfig: chain.solana,
  },
});

const web3AuthOptions: Web3AuthOptions = {
  chainConfig: chain.solana,
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    primaryButton: "externalLogin",
    appName: "Bidcoin",
  },
};

const web3AuthContextConfig = {
  web3AuthOptions,
};

export default web3AuthContextConfig;

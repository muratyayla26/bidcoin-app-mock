"use client";

import { CustomChainConfig, IProvider } from "@web3auth/base";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { chain } from "../../config/chain-config";
import RPC from "@/lib/solanaRPC";
import { getDefaultExternalAdapters } from "@web3auth/default-solana-adapter";
import { clientId } from "@/config/web3auth-config";
import { Web3Auth } from "@web3auth/modal";

export interface IAuthProvider {
  isLoading: boolean;
  isConnected: boolean;
  chainList: { [key: string]: CustomChainConfig };
  chainListOptionSelected: string;
  connectedChain: CustomChainConfig;
  web3Auth: Web3Auth | null;
  provider: IProvider | null;
  getUserInfo: () => Promise<any>;
  getIdToken: () => Promise<string>;
  switchChain: (customChainConfig: CustomChainConfig) => Promise<void | null>;
  updateConnectedChain: (network: string | CustomChainConfig) => void;
  triggerLogin: () => Promise<void>;
  logout: () => Promise<void>;
  getAccounts: () => Promise<string[] | undefined>;
  getBalance: () => Promise<number | undefined>;
  sendTransaction: (arg: any) => Promise<void>;
  signTransaction: () => Promise<void>;
  sendVersionTransaction: () => Promise<void>;
  signVersionedTransaction: () => Promise<void>;
  signAllVersionedTransaction: () => Promise<void>;
  signAllTransaction: () => Promise<void>;
  signMessage: () => Promise<void>;
  getPrivateKey: () => Promise<void>;
  getContractSetup: () => Promise<any[]>;
}

export const AuthContext = createContext<IAuthProvider>({
  isLoading: false,
  isConnected: false,
  chainList: chain,
  chainListOptionSelected: "solana",
  connectedChain: chain.solana,
  web3Auth: null,
  provider: null,
  getUserInfo: async () => null,
  getIdToken: async () => "",
  switchChain: async () => null,
  updateConnectedChain: () => {},
  triggerLogin: async () => {},
  logout: async () => {},
  getAccounts: async () => [],
  getBalance: async () => 0,
  sendTransaction: async () => {},
  signTransaction: async () => {},
  sendVersionTransaction: async () => {},
  signVersionedTransaction: async () => {},
  signAllVersionedTransaction: async () => {},
  signAllTransaction: async () => {},
  signMessage: async () => {},
  getPrivateKey: async () => {},
  getContractSetup: async () => [],
});

interface IAuthProviderProps {
  children?: ReactNode;
}

export function useAuthContext(): IAuthProvider {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chainList, setChainDetails] = useState(chain);
  const [connectedChain, setConnectedChain] = useState<CustomChainConfig>(
    chain.solana
  );
  const [chainListOptionSelected, setChainListOptionSelected] =
    useState("solana");

  const {
    // @ts-ignore
    isConnected,
    connect,
    addAndSwitchChain,
    userInfo,
    provider,
    web3Auth,
    authenticateUser,
  } = useWeb3Auth();

  // useEffect(() => {
  //   async function init() {
  //     try {
  //       setIsLoading(true);
  //       if (isConnected) {
  //         console.log("connected");
  //       } else {
  //         try {
  //           const adapters = await getDefaultExternalAdapters({
  //             options: {
  //               clientId,
  //               chainConfig: chain.solana,
  //             },
  //           });
  //           adapters.forEach((adapter) => {
  //             web3Auth?.configureAdapter(adapter);
  //           });
  //           console.log("initModal", initModal);
  //           await initModal();
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   if (web3Auth) {
  //     init();
  //   }
  // }, [web3Auth, isConnected, provider, connect, initModal]);

  const triggerLogin = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    try {
      await connect();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      await web3Auth.logout();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    console.log("userInfo", userInfo);
    return userInfo;
  };

  const parseToken = (token: any) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64 || ""));
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getIdToken = async () => {
    const idToken = await authenticateUser();
    console.log("Id Token: ", parseToken(idToken.idToken));
    return idToken.idToken;
  };

  const updateConnectedChain = (chainDetails: string | CustomChainConfig) => {
    if (typeof chainDetails === "string") {
      setConnectedChain(chainList[chainDetails]);
      setChainListOptionSelected(chainDetails);
      return;
    }
    // CHECK i added last condition
    if (typeof chainDetails === "object" && chainDetails.displayName) {
      if (
        !(
          chainDetails.displayName in
          Object.keys(chainList).map(function (k) {
            return chainList[k].displayName;
          })
        )
      ) {
        setChainDetails({ ...chain, custom: chainDetails });
      }
      setConnectedChain(chainDetails);
      setChainListOptionSelected("custom");
      return;
    }
    console.log("No network or chainDetails provided");
  };

  const switchChain = async (chainConfig: CustomChainConfig) => {
    if (!web3Auth || !provider) {
      console.log("web3Auth or provider is not initialized yet");
      return;
    }

    try {
      setIsLoading(true);
      await addAndSwitchChain(chainConfig);
      updateConnectedChain(chainConfig);
      console.log("Chain switched successfully");
    } catch (error) {
      console.log("Failed to switch chain", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
    return address;
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
    return balance;
  };

  const sendTransaction = async (txnBody: any) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction(txnBody);
    console.log("receipt", receipt);
  };

  const signTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signTransaction();
    console.log(receipt);
  };

  const sendVersionTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendVersionTransaction();
    console.log(receipt);
  };

  const signVersionedTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signVersionedTransaction();
    console.log(receipt);
  };

  const signAllVersionedTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signAllVersionedTransaction();
    console.log(receipt);
  };

  const signAllTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signAllTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  const getContractSetup = async (): Promise<any[]> => {
    if (!provider) {
      console.log("provider not initialized yet");
      return [];
    }
    const rpc = new RPC(provider);
    const [program, counterPDA] = await rpc.getContractSetup();
    console.log(program, counterPDA);
    return [program, counterPDA];
  };

  // const addChain = async () => {
  //   if (!web3Auth || !provider) {
  //     console.log("web3Auth or provider is not initialized yet");
  //     return;
  //   }
  //   try {
  //     setIsLoading(true);

  //     const chainConfig = {
  //       chainId: "0x2",
  //       displayName: "Solana Testnet",
  //       chainNamespace: CHAIN_NAMESPACES.SOLANA,
  //       tickerName: "SOLANA",
  //       ticker: "SOL",
  //       decimals: 18,
  //       rpcTarget: "https://api.testnet.solana.com",
  //       blockExplorerUrl: "https://explorer.solana.com/?cluster=testnet",
  //       logo: "https://images.toruswallet.io/sol.svg",
  //     };

  //     await web3Auth.addChain(chainConfig);
  //     console.log("New Chain Added");
  //   } catch (error) {
  //     console.log("Failed to switch chain", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const contextProvider = {
    isLoading,
    isConnected,
    connectedChain,
    chainList,
    chainListOptionSelected,
    web3Auth,
    provider,
    getUserInfo,
    getIdToken,
    switchChain,
    updateConnectedChain,
    triggerLogin,
    logout,
    getAccounts,
    getBalance,
    sendTransaction,
    signTransaction,
    sendVersionTransaction,
    signVersionedTransaction,
    signAllVersionedTransaction,
    signAllTransaction,
    signMessage,
    getPrivateKey,
    getContractSetup,
  };
  return (
    <AuthContext.Provider value={contextProvider}>
      {children}
    </AuthContext.Provider>
  );
};


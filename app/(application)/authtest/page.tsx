"use client";

import { Button } from "@nextui-org/button";
import { CustomChainConfig, IProvider } from "@web3auth/base";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/provider/auth-provider";
import { CounterData } from "@/config/anchor/program-config";
import { SolanaWallet } from "@web3auth/solana-provider";
import { Connection } from "@solana/web3.js";

export default function AuthTestPage() {
  const [isSending, setIsSending] = useState(false);
  const {
    isLoading,
    web3Auth,
    provider,
    triggerLogin,
    getUserInfo,
    getIdToken,
    getAccounts,
    getBalance,
    sendTransaction,
    signMessage,
    signTransaction,
    sendVersionTransaction,
    getContractSetup,
  } = useAuthContext();

  useEffect(() => {
    let subscriptionId: number;
    let connection: Connection;
    const initSubscription = async () => {
      console.log("initSubscription");
      //@ts-ignore
      const solanaWallet = new SolanaWallet(provider);
      const connectionConfig = await solanaWallet.request<
        string[],
        CustomChainConfig
      >({
        method: "solana_provider_config",
        params: [],
      });
      connection = new Connection(connectionConfig.rpcTarget);
      const [program, counterPDA] = await getContractSetup();

      subscriptionId = connection.onAccountChange(counterPDA, (accountInfo) => {
        console.log("accountInfo from sub", accountInfo);
        setCounterData(
          program.coder.accounts.decode("counter", accountInfo.data)
        );
      });
    };

    if (web3Auth && provider && !isLoading) initSubscription();

    return () => {
      if (connection) connection.removeAccountChangeListener(subscriptionId);
    };
  }, [web3Auth, provider, isLoading]);

  const [counterData, setCounterData] = useState<CounterData | null>(null);

  const fetchCounterData = async () => {
    const [program, counterPDA] = await getContractSetup();
    program?.account?.counter?.fetch(counterPDA).then((data: any) => {
      console.log("fetchCounterData", data);
      setCounterData(data);
    });
  };

  const incrementCount = async () => {
    try {
      setIsSending(true);
      const [program] = await getContractSetup();

      const transaction = await program.methods
        .increment() // This takes no arguments so we don't need to pass anything
        .transaction();

      await sendTransaction(transaction);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      {isSending ? "sendingggg" : ""}
      <div>test page</div>
      <div>counter data = {counterData?.count?.toString()}</div>
      <Button onClick={triggerLogin}>Trigger login</Button>
      <Button onClick={getUserInfo}>Get user info</Button>
      <Button onClick={getIdToken}>Get id token</Button>
      <Button onClick={getAccounts}>getAccounts</Button>
      <Button onClick={getBalance}>getBalance</Button>
      <Button onClick={sendTransaction}>sendTransaction</Button>
      <Button onClick={signMessage}>signMessage</Button>
      <Button onClick={signTransaction}>signTransaction</Button>
      <Button onClick={sendVersionTransaction}>signvesionTransaction</Button>
      <Button onClick={getContractSetup}>getContractSetup</Button>
      <Button onClick={fetchCounterData}>fetchCounterData</Button>
      <Button onClick={incrementCount}>incrementCount</Button>
    </div>
  );
}


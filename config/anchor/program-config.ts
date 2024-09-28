import { IdlAccounts } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { Counter } from "./idl";

export const programId = new PublicKey(
  process.env.NEXT_PUBLIC_SAMPLE_PROGRAM_ID as string
);

export type CounterData = IdlAccounts<Counter>["counter"];

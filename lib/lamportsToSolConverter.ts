import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const lamportsToSolConverter = (lamports: number): number => {
  const sol = lamports / LAMPORTS_PER_SOL;
  return Number(sol.toFixed(8));
};

export default lamportsToSolConverter;

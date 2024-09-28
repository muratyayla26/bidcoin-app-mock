"use client";

import { AuthController } from "@/components/profile/auth-controller";
import { AutoBidAuctions } from "@/components/profile/auto-bid-auctions";
import { ProfileInfoCard } from "@/components/profile/profile-info-card";
import { SideInfoCard } from "@/components/profile/side-info-card";
import { TrackedAuctions } from "@/components/profile/tracked-auctions";
import { allNFTItems } from "@/lib/mockDatas";
import { Button } from "@nextui-org/button";

export default async function ProfilePage() {
  // const handleFetch = async () => {
  //   const devnetUrlHls = `https://mainnet.helius-rpc.com/?api-key=5f725e22-763a-452a-9905-b414125051c5`;

  //   // const tokensPayload = JSON.stringify({
  //   //   jsonrpc: "2.0",
  //   //   id: "r12331rq2",
  //   //   method: "getAssetsByOwner",
  //   //   params: {
  //   //     ownerAddress: accountId,
  //   //     page: 1,
  //   //     limit: 1000,
  //   //     displayOptions: {
  //   //       showFungible: true,
  //   //     },
  //   //   },
  //   // });
  //   const res = await fetch(devnetUrlHls, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       jsonrpc: "2.0",
  //       id: "my-id",
  //       method: "getAssetsByCreator",
  //       params: {
  //         creatorAddress: "D3XrkNZz6wx6cofot7Zohsf2KSsu2ArngNk8VqU9cTY3",
  //         onlyVerified: true,
  //         page: 1,
  //         limit: 100,
  //       },
  //     }),
  //   });

  //   const jsonres = await res.json();
  //   console.log("jsonres", jsonres);
  // };

  // const generateTest = () => {
  //   const solanaAddresses = [
  //     "3hGhdH4VsRCxM8XVdRYcFFow4rDJ9hZdPZ6U3EcsbsA5",
  //     "D4XsNd5hHb5Vx9z4RMZwdF5DbJeFnUzZnLxZr5TxV7cV",
  //     "9rFkvkTi2nZy7An9LsqWaTFzU4ff3eNdHLrGdxAQRg9R",
  //     "BrSHuA4CxTwT3PusPLn7Rx1M9dH93rUZ9JeBtgnW5XKb",
  //     "8gZL9wYYcCZChHRr5gLpFK98pMWAGmXvhpboFHEEt3Qd",
  //     "G7ViHbK2m3Nj7dDGHUQmMN3XqwbDZddDCQsXRUjhnQHY",
  //     "B7TzF2cNVvRpnzvZjWrp8uEcErLfmiZ2BmWn1j3ktbpM",
  //     "5X7t2u1PdNxiRHscow5UNVG9DhnsC5AaVCWrmn7tYk3d",
  //     "3wFXyZngPoM8pFx5bmfQCDWS2fYoyr3k9dRFKQa2QKEH",
  //     "7GFENmZ9yMC62zMu3PHwQKJd5kG34MtoZoHY4LM95e7Z",
  //     "BbJhUoFDSfzEgEJJKC9GBtaZYwsqZd6eFnvztXV6e9KH",
  //     "EXE58RFWYYQgqdRmHVoLvTEJPrgycwhViLgHFj2Xyz8x",
  //     "5vGf89D2xfVG5Q6Gi5dbXDnVAXwHNy5ZgDA13UHKW3iq",
  //     "2a9MtxdHycCqBYY9MEbqs8ZrAeVvqAJYt3r3JmDa8VYR",
  //     "8tvQk9BRjZLysbvFqhhGejPLR4DS4Fyo3JrK9MtPzPLu",
  //     "4hXw9THadNiA23TEysW2GhZd1MwPiAA2pGUnk5doDcnJ",
  //     "H9oDPoHyV9dUT13ayrbhrj2Y9cFejtL5Gy3Y7bWWrRNN",
  //     "8DyLG7ZrdCCdxsHqAW1NyNE4dS5t23GwLg1ZfNxvARvS",
  //     "5rZFAayRrfvLw4LVDA3ERZ5NZoyk5iQ8K6RdGXyWpYBz",
  //     "B65dJKiZoTf14z2rZ16bhB5TC7YY3WBtDeC5iF9BKgqK",
  //   ];
  //   const mynewarry = allNFTItems.map((item) => {
  //     const randomNum = Math.random() * 20; // Generates a random number between 0 and 20
  //     const newprice = parseFloat(randomNum.toFixed(4));
  //     return {
  //       ...item,
  //       price: newprice,
  //       leader: solanaAddresses[Math.floor(Math.random() * 21)],
  //     };
  //   });
  //   console.log(mynewarry);
  // };

  return (
    <AuthController>
      <div className="flex justify-between items-center gap-6">
        <ProfileInfoCard />
        <SideInfoCard />
        {/* <Button onClick={handleFetch}>fetch test</Button>
        <Button onClick={generateTest}>generate test</Button> */}
      </div>
      <TrackedAuctions />
      <AutoBidAuctions />
    </AuthController>
  );
}

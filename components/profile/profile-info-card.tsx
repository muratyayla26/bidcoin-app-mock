"use client";

import { Card, CardBody } from "@nextui-org/card";
import { useAuthContext } from "../provider/auth-provider";
import { useEffect, useState } from "react";
import { IProfileData } from "@/types/profile";
import lamportsToSolConverter from "@/lib/lamportsToSolConverter";
import { Skeleton } from "@nextui-org/skeleton";
import { Snippet } from "@nextui-org/snippet";
import { Image } from "@nextui-org/image";

export const ProfileInfoCard = () => {
  let finalData = "0";
  if (typeof window !== "undefined") {
    const storageData = localStorage.getItem("bidcoinbalance");
    if (storageData) {
      finalData = JSON.parse(storageData);
    } else {
      finalData = "999";
      localStorage.setItem("bidcoinbalance", "999");
    }
  }
  const [bidcoinBalance, setBidcoinBalance] = useState(finalData);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<IProfileData>({
    userInfo: { email: "" },
    walletAddress: "",
    balance: 0,
  });

  const { isConnected, provider, getUserInfo, getAccounts, getBalance } =
    useAuthContext();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [user, accounts, balance] = await Promise.all([
          getUserInfo(),
          getAccounts(),
          getBalance(),
        ]);
        setProfileData((prev) => ({
          ...prev,
          userInfo: user,
          walletAddress: accounts?.[0] || "",
          balance: balance || 0,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isConnected && provider) fetchProfileData();
  }, [isConnected, provider]);

  const LoadingSkeleton = () => (
    <div className="flex flex-col justify-start items-start gap-3">
      <Skeleton className="w-full h-[2rem] rounded-lg" />
      <Skeleton className="w-full h-[2rem] rounded-lg" />
      <Skeleton className="w-full h-[2rem] rounded-lg" />
    </div>
  );

  return (
    <Card className="border-none w-4/5">
      <CardBody className="h-48">
        {isLoading && LoadingSkeleton()}
        {!isLoading && (
          <>
            <div className="mb-4 flex justify-start items-center">
              <p className="w-[10rem] text-sm font-medium text-gray-500 dark:text-textcontent1">
                Wallet Address
              </p>
              <Snippet
                symbol=""
                className="bg-transparent text-sm font-normal p-0"
              >
                {profileData.walletAddress}
              </Snippet>
            </div>
            <div className="mb-4 flex justify-start items-center">
              <p className="w-[10rem] text-sm font-medium text-gray-500 dark:text-textcontent1">
                Email
              </p>
              <p className="text-sm font-normal">
                {profileData.userInfo?.email || "-"}
              </p>
            </div>
            <div className="mb-4 flex justify-start items-center">
              <p className="w-[10rem] text-sm font-medium text-gray-500 dark:text-textcontent1">
                Balance
              </p>
              <p className="text-sm font-normal">
                {lamportsToSolConverter(profileData.balance)}
              </p>
              <Image
                className="ml-1"
                src="images/sol-logo-tp.svg"
                width={13}
                height={18}
                alt="solana logo"
              />
            </div>
            <div className="mb-4 flex justify-start items-center">
              <p className="w-[10rem] text-sm font-medium text-gray-500 dark:text-textcontent1">
                Bid Balance
              </p>
              <p className="text-sm font-normal">{bidcoinBalance}</p>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

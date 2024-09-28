"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/firebase/auth";
import { Button } from "@nextui-org/button";
import { useState } from "react";

export const DashboardItems = ({ currentUser }: { currentUser: any }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const isOk = await signOut();
      if (isOk) router.push("/admin-login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <p>Please wait while signing out...</p>}
      <p>Welcome, {currentUser?.displayName}</p>
      <Button onClick={handleSignOut} color="danger">
        Sign Out
      </Button>
    </>
  );
};

"use client";

import { signInWithGoogle } from "@/lib/firebase/auth";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginItems = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const isOk = await signInWithGoogle();
      if (isOk) router.push("/admin-dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-3 items-center">
      <Button isDisabled={isLoading} color="primary" onClick={handleSignIn}>
        Sign in with Google
      </Button>
    </div>
  );
};

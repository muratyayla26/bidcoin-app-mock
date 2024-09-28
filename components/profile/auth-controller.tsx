"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/provider/auth-provider";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

export const AuthController = ({ children }: { children: any }) => {
  const { isLoading, isConnected, triggerLogin, web3Auth } = useAuthContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading || !isMounted) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isMounted && !isLoading && !isConnected) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center">
        <p className="text-md mb-6">
          You are not authorized yet, please login.
        </p>
        <Button
          onClick={triggerLogin}
          isDisabled={isLoading || !web3Auth}
          color="success"
          className="text-black"
        >
          Login
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

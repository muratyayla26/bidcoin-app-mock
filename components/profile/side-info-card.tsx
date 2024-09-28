"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useAuthContext } from "../provider/auth-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SideInfoCard = () => {
  const router = useRouter();
  const { logout } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-none w-1/5">
      <CardBody className="h-48">
        <Button color="danger" onClick={handleLogout} isLoading={isLoading}>
          Logout
        </Button>
      </CardBody>
    </Card>
  );
};

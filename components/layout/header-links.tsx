"use client";

import { siteConfig } from "@/config/site";
import { NavbarItem } from "@nextui-org/navbar";
import { usePathname } from "next/navigation";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useAuthContext } from "../provider/auth-provider";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export const HeaderLinks = () => {
  const pathname = usePathname();
  const { isLoading, isConnected, web3Auth, triggerLogin } = useAuthContext();
  const [isAdminAvailable, setIsAdminAvailable] = useState(false);
  // console.log("isLoading navbar", isLoading);
  // console.log("isConnected navbar", isConnected);

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdminAvailable(true);
      } else {
        setIsAdminAvailable(false);
      }
    });

    return () => subscription();
  }, []);

  return (
    <ul className="flex gap-10 justify-start items-center ml-2">
      {siteConfig.navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              color={isActive ? "primary" : "foreground"}
              className="font-semibold"
            >
              {item.label}
            </Link>
          </NavbarItem>
        );
      })}
      <div className="flex items-center">
        {isConnected && (
          <Button
            as={Link}
            href="/profile"
            isDisabled={isLoading || !web3Auth}
            color="success"
            className="text-black"
          >
            Profile
          </Button>
        )}
        {!isConnected && (
          <Button
            onClick={triggerLogin}
            isDisabled={isLoading || !web3Auth}
            color="success"
            className="text-black"
          >
            Login
          </Button>
        )}
        {isAdminAvailable && (
          <Button
            as={Link}
            href="/admin-dashboard"
            color="success"
            className="text-black ml-4"
          >
            Admin Dashboard
          </Button>
        )}
      </div>
    </ul>
  );
};

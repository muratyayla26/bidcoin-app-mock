import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { Logo } from "@/components/common/icons";
import { HeaderLinks } from "./header-links";

export const Navbar = () => (
  <NextUINavbar maxWidth="xl" position="sticky" isBordered>
    <div className="flex justify-between items-center w-full">
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <Logo />
          <p className="font-bold text-inherit">Bidcoin Auction Marketplace</p>
        </NextLink>
      </NavbarBrand>
      <HeaderLinks />
    </div>
    <div className="flex grow-0">
      <NavbarItem className="hidden sm:flex gap-2">
        <ThemeSwitch />
      </NavbarItem>
    </div>
  </NextUINavbar>
);


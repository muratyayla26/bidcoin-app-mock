export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Bidcoin Auction Marketplace",
  description: "Bidcoin Auction Marketplace",
  auctionsName: "BAM - Auctions List",
  auctionsDesc: "BAM - Auctions List",
  itemName: "BAM - Auction",
  itemDesc: "BAM - Auction",
  profileName: "BAM - Profile",
  profileDesc: "BAM - Profile",
  onboardName: "BAM - Onboard",
  onboardDesc: "BAM - Onboard",
  navItems: [
    {
      label: "Home",
      href: "/onboard",
    },
    {
      label: "Auctions",
      href: "/auctions",
    },
  ],
};


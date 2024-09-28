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
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Auctions",
      href: "/auctions",
    },
  ],
};


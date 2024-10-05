import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.auctionsName,
    template: `%s - ${siteConfig.auctionsName}`,
  },
  description: siteConfig.auctionsDesc,
};

export default function AuctionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-0">
      <div className="inline-block max-w-lg text-center justify-center w-full min-w-full">
        {children}
      </div>
    </section>
  );
}


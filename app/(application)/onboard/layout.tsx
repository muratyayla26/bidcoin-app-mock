import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.onboardName,
    template: `%s - ${siteConfig.onboardName}`,
  },
  description: siteConfig.onboardDesc,
};

export default function OnboardLayout({
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

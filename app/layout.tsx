import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { ThemeProvider } from "../components/provider/theme-provider";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { AuthProvider } from "@/components/provider/auth-provider";
import { Web3AuthProviderWrapper } from "@/components/provider/web3-auth-provider-wrapper";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <Web3AuthProviderWrapper>
            <AuthProvider>{children}</AuthProvider>
          </Web3AuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}


import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { ThemeProvider } from "../components/provider/theme-provider";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/layout/navbar";
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
            <AuthProvider>
              <div className="relative flex flex-col">
                <Navbar />
                <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow">
                  {children}
                </main>
                <footer className="w-full flex items-center justify-center py-3"></footer>
              </div>
            </AuthProvider>
          </Web3AuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

// node_modules nomodal
// const {
//   adapter,
//   provider: _provider
// } = data;
// const provider = this.getAdapter(adapter) || _provider

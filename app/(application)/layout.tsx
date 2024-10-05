import { Navbar } from "@/components/layout/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
}

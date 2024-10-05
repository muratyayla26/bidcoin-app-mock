import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { ClipboardMinus, Search } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <div className="absolute top-0 bottom-0 left-0 right-0 inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 opacity-50"></div>
      <div className="relative container mx-auto px-4 py-16 ">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Bidcoin
          </h1>
          <p className="text-xl md:text-2xl font-semibold">
            Revolutionizing NFT Bidding
          </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Discover Rare NFTs</h2>
            <p className="text-gray-300">
              Bidcoin is the premier platform for bidding on exclusive NFTs. Our
              cutting-edge blockchain technology ensures secure and transparent
              auctions, allowing you to collect unique digital assets with
              confidence.
            </p>
            <p className="text-gray-300">
              Join a thriving community of collectors and creators, and
              experience the future of digital ownership. With Bidcoin, you're
              not just buying art – you're investing in the decentralized
              future.
            </p>
          </section>
          <section className="bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Join the Revolution</h2>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                as={Link}
                href="https://x.com/BidcoinAuction"
                target="_blank"
                color="primary"
              >
                Follow us on
                <Image
                  className="invert"
                  src="/images/xlogo.png"
                  width={23}
                  height={23}
                  alt="X logo"
                />
              </Button>
              <Button
                as={Link}
                href="https://docs.google.com/forms/d/e/1FAIpQLSeb2k-jer4Z6bmxTvrHlDI9aUY_ndxu854lPhXj1B5oCI21NQ/viewform"
                target="_blank"
                color="primary"
              >
                Share Feedback
                <ClipboardMinus size={20} />
              </Button>
              <Button
                as={Link}
                href="/auctions"
                target="_blank"
                color="primary"
              >
                Explore Auctions
                <Search size={20} />
              </Button>
            </div>
          </section>
        </main>
        <footer className="mt-16 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex items-center">
            <p className="text-sm text-gray-400">
              &copy; 2024 Bidcoin. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}


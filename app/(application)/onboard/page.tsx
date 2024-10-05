"use client";

import { HeroCarousel } from "@/components/main-page/hero-carousel";
import { ItemsList } from "@/components/main-page/items-list";
import { allNFTItems } from "@/lib/mockDatas";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useState } from "react";

export default function OnBoard() {
  let finalData = [];
  if (typeof window !== "undefined") {
    const storageData = localStorage.getItem("allItems");
    if (storageData) {
      finalData = JSON.parse(storageData);
    } else {
      finalData = allNFTItems;
      localStorage.setItem("allItems", JSON.stringify(allNFTItems));
    }
  }
  const [results, setResults] = useState<any[]>(finalData);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-5">
      <HeroCarousel />
      <h4 className="font-medium text-xl text-left w-full mt-8">
        Top Auctions
      </h4>
      <ItemsList results={results} />
      <Button as={Link} href="/auctions" className="mt-3" color="secondary">
        See More
      </Button>
    </section>
  );
}

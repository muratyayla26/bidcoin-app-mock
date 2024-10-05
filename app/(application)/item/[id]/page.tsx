"use client";

import { AuctionRulesCard } from "@/components/item-detail/auction-rules-card";
import { BidHistory } from "@/components/item-detail/bid-history";
import { FaqCard } from "@/components/item-detail/faq-card";
import { ItemDetailCard } from "@/components/item-detail/item-detail-card";
import { allNFTItems } from "@/lib/mockDatas";
import Image from "next/image";
import { Snippet } from "@nextui-org/snippet";
import { useState } from "react";

export default function ItemPage({ params }: { params: { id: string } }) {
  let finalData = [];
  if (typeof window !== "undefined") {
    const storageData = localStorage.getItem("allItems");
    if (storageData) {
      finalData = JSON.parse(storageData);
    } else {
      finalData = allNFTItems;
      localStorage.setItem("allItems", JSON.stringify(allNFTItems));
    }
    finalData = finalData.find((item: any) => item.id === params.id);
  }
  const [item, setItem] = useState<any>(finalData);

  return (
    <div className="grid grid-cols-[70%_30%] w-full ">
      <div className="col-span-1 grid grid-cols-[50%_50%] w-full">
        <div className="col-span-1 relative h-[100%]">
          <Image
            alt={item.content.metadata.name}
            priority
            fill
            className="w-auto h-[100%] min-h-[100%] rounded-large object-cover"
            src={item.content.links.image}
          />
          {!item.bamPros && (
            <Snippet
              symbol=""
              hideCopyButton
              color="success"
              variant="solid"
              className="absolute z-10 bottom-2 left-2 cursor-default"
            >
              Newbies Only!
            </Snippet>
          )}
        </div>
        <div className="col-span-1 sm:ml-6 ml-3">
          <ItemDetailCard item={item} setItem={setItem} />
        </div>
        <div className="col-span-2 w-full sm:mt-6 mt-3">
          <BidHistory bidHistory={item.bidHistory} />
        </div>
      </div>
      <div className="col-span-1 sm:ml-6 ml-3">
        <AuctionRulesCard />
        <FaqCard />
      </div>
    </div>
  );
}

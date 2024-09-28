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

  // const res = await fetch(
  //   `https://rickandmortyapi.com/api/character/${params.id}`
  // );
  // const data = await res.json();
  // const mychardata = {
  //   id: 2,
  //   name: "Morty Smith",
  //   status: "Alive",
  //   species: "Human",
  //   type: "",
  //   gender: "Male",
  //   origin: { name: "unknown", url: "" },
  //   location: {
  //     name: "Citadel of Ricks",
  //     url: "https://rickandmortyapi.com/api/location/3",
  //   },
  //   image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  //   url: "https://rickandmortyapi.com/api/character/2",
  //   created: "2017-11-04T18:50:21.651Z",
  //   episode: [
  //     "https://rickandmortyapi.com/api/episode/1",
  //     "https://rickandmortyapi.com/api/episode/2",
  //     "https://rickandmortyapi.com/api/episode/3",
  //     "https://rickandmortyapi.com/api/episode/4",
  //     "https://rickandmortyapi.com/api/episode/5",
  //     "https://rickandmortyapi.com/api/episode/6",
  //     "https://rickandmortyapi.com/api/episode/7",
  //     "https://rickandmortyapi.com/api/episode/8",
  //     "https://rickandmortyapi.com/api/episode/9",
  //     "https://rickandmortyapi.com/api/episode/10",
  //     "https://rickandmortyapi.com/api/episode/11",
  //     "https://rickandmortyapi.com/api/episode/12",
  //     "https://rickandmortyapi.com/api/episode/13",
  //     "https://rickandmortyapi.com/api/episode/14",
  //     "https://rickandmortyapi.com/api/episode/15",
  //     "https://rickandmortyapi.com/api/episode/16",
  //     "https://rickandmortyapi.com/api/episode/17",
  //     "https://rickandmortyapi.com/api/episode/18",
  //     "https://rickandmortyapi.com/api/episode/19",
  //     "https://rickandmortyapi.com/api/episode/20",
  //     "https://rickandmortyapi.com/api/episode/21",
  //     "https://rickandmortyapi.com/api/episode/22",
  //     "https://rickandmortyapi.com/api/episode/23",
  //     "https://rickandmortyapi.com/api/episode/24",
  //     "https://rickandmortyapi.com/api/episode/25",
  //     "https://rickandmortyapi.com/api/episode/26",
  //     "https://rickandmortyapi.com/api/episode/27",
  //     "https://rickandmortyapi.com/api/episode/28",
  //     "https://rickandmortyapi.com/api/episode/29",
  //   ],
  // };
  // const { id, name, image } = data;

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

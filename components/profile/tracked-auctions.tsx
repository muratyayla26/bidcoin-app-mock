import { allNFTItems } from "@/lib/mockDatas";
import { useEffect, useState } from "react";
import { ItemListCard } from "../common/item-list-card";

export const TrackedAuctions = () => {
  let finalData;
  const storageData = localStorage.getItem("allItems");
  if (storageData) {
    finalData = JSON.parse(storageData);
  } else {
    finalData = allNFTItems;
    localStorage.setItem("allItems", JSON.stringify(allNFTItems));
  }
  finalData = finalData.filter((item: any) => item.tracked);
  const [results, setResults] = useState<any[]>(finalData);

  const handleCustomTrack = (event: boolean, id: number) => {
    const storageData = localStorage.getItem("allItems");
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      const newData = parsedData.map((item: any) => {
        if (item.id === id) {
          return { ...item, tracked: event };
        }
        return item;
      });
      localStorage.setItem("allItems", JSON.stringify(newData));
      setResults((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <h4 className="font-medium text-xl text-left w-full my-4">
        Tracked Auctions ({finalData.length || 0})
      </h4>
      <div className="gap-3 sm:gap-6 grid grid-cols-2 sm:grid-cols-5">
        {results.map((item: any) => (
          <ItemListCard
            key={item.id}
            id={item.id}
            imgUrl={item.content.links.image}
            title={item.content.metadata.name}
            leader={item.leader}
            price={item.price}
            tracked={item.tracked}
            bamPros={item.bamPros}
            handleCustomTrack={handleCustomTrack}
          />
        ))}
      </div>
    </>
  );
};

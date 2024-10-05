"use client";

import { ItemsList } from "@/components/auctions/items-list";
import { LeftFilters } from "@/components/auctions/left-filters";
import { ListPagination } from "@/components/auctions/list-pagination";
import { SearchInput } from "@/components/auctions/search-input";
import { allNFTItems } from "@/lib/mockDatas";
import { useState } from "react";

export default function AuctionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page;
  let finalAll = [];
  let finalResult = [];
  if (typeof window !== "undefined") {
    const storageData = localStorage.getItem("allItems");
    if (storageData) {
      finalAll = JSON.parse(storageData);
      finalResult = JSON.parse(storageData).slice(0, 20);
    } else {
      finalAll = allNFTItems;
      finalResult = allNFTItems.slice(0, 20);
      localStorage.setItem("allItems", JSON.stringify(allNFTItems));
    }
  }
  const [allData, setAllData] = useState<any[]>(finalAll);
  const [results, setResults] = useState<any[]>(finalResult);
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [pageLength, setPageLength] = useState(finalAll.length);

  const handlePageChange = (page: number) => {
    const itemsPerPage = 20;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (tagFilters.length === 1) {
      if (tagFilters[0] === "bampros") {
        const filteredData = allData.filter((item) => item.bamPros);
        const slicedData = filteredData.slice(startIndex, endIndex);
        setPageLength(filteredData.length);
        setResults(slicedData);
      } else {
        const filteredData = allData.filter((item) => !item.bamPros);
        const slicedData = filteredData.slice(startIndex, endIndex);
        setPageLength(filteredData.length);
        setResults(slicedData);
      }
    } else {
      const slicedData = allData.slice(startIndex, endIndex);
      setPageLength(allData.length);
      setResults(slicedData);
    }
    setCurrentPage(page);
    const element = document.getElementById("auctions-container");
    if (element) {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleTagChange = (value: string[]) => {
    if (value.length === 0 || value.length === 2) {
      const slicedData = allData.slice(0, 20);
      setPageLength(allData.length);
      setResults(slicedData);
    } else if (value[0] === "bampros") {
      const filteredData = allData.filter((item) => item.bamPros);
      setPageLength(filteredData.length);
      setResults(filteredData.slice(0, 20));
    } else {
      const filteredData = allData.filter((item) => !item.bamPros);
      setPageLength(filteredData.length);
      setResults(filteredData.slice(0, 20));
    }
    setCurrentPage(1);
    setTagFilters(value);
    const element = document.getElementById("auctions-container");
    if (element) {
      element.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="flex items-start justify-start">
        <LeftFilters handleTagChange={handleTagChange} />
        <div
          id="auctions-container"
          className="flex flex-col justify-start items-center relative h-[calc(100vh-8rem)] overflow-y-scroll rounded-xl"
        >
          <SearchInput />
          <ItemsList results={results} />
          <ListPagination
            page={currentPage}
            total={pageLength}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}


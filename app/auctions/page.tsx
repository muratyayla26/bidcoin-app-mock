"use client";

import { ItemsList } from "@/components/auctions/items-list";
import { LeftFilters } from "@/components/auctions/left-filters";
import { ListPagination } from "@/components/auctions/list-pagination";
import { SearchInput } from "@/components/auctions/search-input";
import { allNFTItems } from "@/lib/mockDatas";
import { useEffect, useState } from "react";

export default function AuctionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page;
  let finalAll;
  let finalResult;
  const storageData = localStorage.getItem("allItems");
  if (storageData) {
    finalAll = JSON.parse(storageData);
    finalResult = JSON.parse(storageData).slice(0, 20);
  } else {
    finalAll = allNFTItems;
    finalResult = allNFTItems.slice(0, 20);
    localStorage.setItem("allItems", JSON.stringify(allNFTItems));
  }
  const [allData, setAllData] = useState<any[]>(finalAll);
  const [results, setResults] = useState<any[]>(finalResult);
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [pageLength, setPageLength] = useState(finalAll.length);

  // const itemsPerPage = 20;
  // const currentPage = Number(page) || 1;
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

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

  // const res = await fetch(
  //   `https://rickandmortyapi.com/api/character/${page ? `?page=${page}` : ""}`
  // );
  // const data = await res.json();
  // // console.log("data", data);
  // const mydata = {
  //   info: {
  //     count: 826,
  //     pages: 42,
  //     next: "https://rickandmortyapi.com/api/character?page=2",
  //     prev: null,
  //   },
  //   results: [
  //     {
  //       id: 1,
  //       name: "Rick Sanchez",
  //       status: "Alive",
  //       species: "Human",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/1",
  //       created: "2017-11-04T18:48:46.250Z",
  //     },
  //     {
  //       id: 2,
  //       name: "Morty Smith",
  //       status: "Alive",
  //       species: "Human",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/2",
  //       created: "2017-11-04T18:50:21.651Z",
  //     },
  //     {
  //       id: 3,
  //       name: "Summer Smith",
  //       status: "Alive",
  //       species: "Human",
  //       type: "",
  //       gender: "Female",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/3",
  //       created: "2017-11-04T19:09:56.428Z",
  //     },
  //     {
  //       id: 4,
  //       name: "Beth Smith",
  //       status: "Alive",
  //       species: "Human",
  //       type: "",
  //       gender: "Female",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/4",
  //       created: "2017-11-04T19:22:43.665Z",
  //     },
  //     {
  //       id: 5,
  //       name: "Jerry Smith",
  //       status: "Alive",
  //       species: "Human",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/5",
  //       created: "2017-11-04T19:26:56.301Z",
  //     },
  //     {
  //       id: 6,
  //       name: "Abadango Cluster Princess",
  //       status: "Alive",
  //       species: "Alien",
  //       type: "",
  //       gender: "Female",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/6",
  //       created: "2017-11-04T19:50:28.250Z",
  //     },
  //     {
  //       id: 7,
  //       name: "Abradolf Lincler",
  //       status: "unknown",
  //       species: "Human",
  //       type: "Genetic experiment",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/7",
  //       created: "2017-11-04T19:59:20.523Z",
  //     },
  //     {
  //       id: 8,
  //       name: "Adjudicator Rick",
  //       status: "Dead",
  //       species: "Human",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/8",
  //       created: "2017-11-04T20:03:34.737Z",
  //     },
  //     {
  //       id: 9,
  //       name: "Agency Director",
  //       status: "Dead",
  //       species: "Human",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/9",
  //       created: "2017-11-04T20:06:54.976Z",
  //     },
  //     {
  //       id: 10,
  //       name: "Alan Rails",
  //       status: "Dead",
  //       species: "Human",
  //       type: "Superhuman (Ghost trains summoner)",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/10",
  //       created: "2017-11-04T20:19:09.017Z",
  //     },
  //     {
  //       id: 11,
  //       name: "Albert Einstein",
  //       status: "Dead",
  //       species: "Human",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/11",
  //       created: "2017-11-04T20:20:20.965Z",
  //     },
  //     {
  //       id: 12,
  //       name: "Alexander",
  //       status: "Dead",
  //       species: "Human",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/12",
  //       created: "2017-11-04T20:32:33.144Z",
  //     },
  //     {
  //       id: 13,
  //       name: "Alien Googah",
  //       status: "unknown",
  //       species: "Alien",
  //       type: "",
  //       gender: "unknown",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/13",
  //       created: "2017-11-04T20:33:30.779Z",
  //     },
  //     {
  //       id: 14,
  //       name: "Alien Morty",
  //       status: "unknown",
  //       species: "Alien",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/14",
  //       created: "2017-11-04T20:51:31.373Z",
  //     },
  //     {
  //       id: 15,
  //       name: "Alien Rick",
  //       status: "unknown",
  //       species: "Alien",
  //       type: "",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/15",
  //       created: "2017-11-04T20:56:13.215Z",
  //     },
  //     {
  //       id: 16,
  //       name: "Amish Cyborg",
  //       status: "Dead",
  //       species: "Alien",
  //       type: "Parasite",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/16",
  //       created: "2017-11-04T21:12:45.235Z",
  //     },
  //     {
  //       id: 17,
  //       name: "Annie",
  //       status: "Alive",
  //       species: "Human",
  //       type: "",
  //       gender: "Female",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/17",
  //       created: "2017-11-04T22:21:24.481Z",
  //     },
  //     {
  //       id: 18,
  //       name: "Antenna Morty",
  //       status: "Alive",
  //       species: "Human",
  //       type: "Human with antennae",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/18",
  //       created: "2017-11-04T22:25:29.008Z",
  //     },
  //     {
  //       id: 19,
  //       name: "Antenna Rick",
  //       status: "unknown",
  //       species: "Human",
  //       type: "Human with antennae",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/19",
  //       created: "2017-11-04T22:28:13.756Z",
  //     },
  //     {
  //       id: 20,
  //       name: "Ants in my Eyes Johnson",
  //       status: "unknown",
  //       species: "Human",
  //       type: "Human with ants in his eyes",
  //       gender: "Male",
  //       origin: [Object],
  //       location: [Object],
  //       image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
  //       episode: [Array],
  //       url: "https://rickandmortyapi.com/api/character/20",
  //       created: "2017-11-04T22:34:53.659Z",
  //     },
  //   ],
  // };
  // results = data.results;

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


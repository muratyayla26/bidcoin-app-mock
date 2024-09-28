import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Snippet } from "@nextui-org/snippet";
import { v4 as uuidv4 } from "uuid";

export const BidHistory = ({ bidHistory }: { bidHistory: string[] }) => {
  // const mockAddresses = [
  //   "So11111111111111111111111111111111111111112",
  //   "7dHbWXodLaLnaExcz6XgJ2NwDKxtP7AedRzTSGxyZJKL",
  //   "Es9vMFrzaCER6itCZvsXyzG7yeAz6udRJpA6uSEBzks",
  //   "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
  //   "2fnjyuXX4iLKYnToob1vcWSddDsn15LzPkAC44yXfpPr",
  //   "8KLHY3w8Ru6wkG1Jhgwwzz1tUG2cvk3FwW8vGhCDjiZq",
  //   "4k3Dyjzvzp8eR8wqrD4VnpYRR2okyLkdGqwUPcExiarL",
  //   "EpeUwtJ2zq3kjTMQNnBstWY5LVZJBNQqH3VoDc23VymD",
  //   "Agu5N4EMHyFLzzptTjGrXKSTzRWbwKU7QY6yDqUy11UX",
  //   "GdS7Wzot57EcUog5tHEBUAfpZqfHBpDPbfRyxf2RgxAg",
  //   "H8a7GVHP59m4q7Z5MAkifUhNzKwwpvU8TBk6KNUnwYB7",
  //   "Fm9fDmGcN68LoErKNfhtYxAJ9Ur88mFZrEVEP8Gj9HqD",
  //   "DiJcxJPWNxpxw7SKe7Z2V3eJKvSAzBzxZRTHh9WNXz6d",
  //   "5ZcqCgzGEg3qFmhKHv8dQDe8Adbv2LcfziBtYR1t23tb",
  //   "J3TYkT4drVw5mowBF1EftQkXBkWnhoWsPv2D2gr3ecvg",
  //   "EpeTGQU99AZw9ZRt52WChAeYX35uYDjJw4JhJCuKdhXJ",
  //   "7gjNiPun3HKEqBv4iW5QUmGhMwAMnrs2zbXnWfD3rAjh",
  //   "ApqWcZjJsp4vxYFoerYWREvmDjyZwvcsZWBUJg6Z6iDA",
  //   "Aa1tGgnjcF3T27VH7pejBq1NsLsD7MRqDvc49HqCy8Ww",
  //   "A14mWT6UhEY2WruHrhZP6GkaSfpU6Qa28yA4wHSiFM7J",
  // ];

  // console.log("bidHistory", bidHistory);
  const mutationArr = bidHistory;
  const reversed = mutationArr
    .slice()
    .reverse()
    .filter((item) => item);
  return (
    <Card className="border-none h-fit ">
      <CardHeader>
        <h4 className="font-medium text-xl text-left px-3">
          Bid History ({bidHistory.length})
        </h4>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-hidden p-0 max-h-[350px] overflow-y-scroll">
        {reversed.map((item) => (
          <div
            key={uuidv4()}
            className="px-3 w-full h-10 flex items-center justify-start odd:bg-gray-100 dark:odd:bg-content2"
          >
            <Snippet symbol="" className="bg-transparent">
              {item}
            </Snippet>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

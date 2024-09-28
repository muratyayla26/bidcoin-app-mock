import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useAuthContext } from "../provider/auth-provider";
import { Chip } from "@nextui-org/chip";
dayjs.extend(duration);

interface ItemListCardProps {
  id: number;
  imgUrl: string;
  title: string;
  leader: string;
  price: number;
  tracked: boolean;
  bamPros: boolean;
  showActive?: boolean;
  handleCustomTrack?: (event: boolean, id: number) => void;
}

const solanaAddresses = [
  "3hGhdH4VsRCxM8XVdRYcFFow4rDJ9hZdPZ6U3EcsbsA5",
  "D4XsNd5hHb5Vx9z4RMZwdF5DbJeFnUzZnLxZr5TxV7cV",
  "9rFkvkTi2nZy7An9LsqWaTFzU4ff3eNdHLrGdxAQRg9R",
  "BrSHuA4CxTwT3PusPLn7Rx1M9dH93rUZ9JeBtgnW5XKb",
  "8gZL9wYYcCZChHRr5gLpFK98pMWAGmXvhpboFHEEt3Qd",
  "G7ViHbK2m3Nj7dDGHUQmMN3XqwbDZddDCQsXRUjhnQHY",
  "B7TzF2cNVvRpnzvZjWrp8uEcErLfmiZ2BmWn1j3ktbpM",
  "5X7t2u1PdNxiRHscow5UNVG9DhnsC5AaVCWrmn7tYk3d",
  "3wFXyZngPoM8pFx5bmfQCDWS2fYoyr3k9dRFKQa2QKEH",
  "7GFENmZ9yMC62zMu3PHwQKJd5kG34MtoZoHY4LM95e7Z",
  "BbJhUoFDSfzEgEJJKC9GBtaZYwsqZd6eFnvztXV6e9KH",
  "EXE58RFWYYQgqdRmHVoLvTEJPrgycwhViLgHFj2Xyz8x",
  "5vGf89D2xfVG5Q6Gi5dbXDnVAXwHNy5ZgDA13UHKW3iq",
  "2a9MtxdHycCqBYY9MEbqs8ZrAeVvqAJYt3r3JmDa8VYR",
  "8tvQk9BRjZLysbvFqhhGejPLR4DS4Fyo3JrK9MtPzPLu",
  "4hXw9THadNiA23TEysW2GhZd1MwPiAA2pGUnk5doDcnJ",
  "H9oDPoHyV9dUT13ayrbhrj2Y9cFejtL5Gy3Y7bWWrRNN",
  "8DyLG7ZrdCCdxsHqAW1NyNE4dS5t23GwLg1ZfNxvARvS",
  "5rZFAayRrfvLw4LVDA3ERZ5NZoyk5iQ8K6RdGXyWpYBz",
  "B65dJKiZoTf14z2rZ16bhB5TC7YY3WBtDeC5iF9BKgqK",
];
const generateRandomTime = () => Math.floor(Math.random() * (15 - 5 + 1)) + 5;

const generateRandomUser = (usernames: any) => {
  const randomIndex = Math.floor(Math.random() * usernames.length);
  return usernames[randomIndex];
};

export const ItemListCard: FC<ItemListCardProps> = ({
  id,
  imgUrl,
  title,
  leader,
  price,
  tracked,
  bamPros,
  showActive,
  handleCustomTrack,
}) => {
  const { isConnected, triggerLogin } = useAuthContext();
  const [currPrice, setCurrPrice] = useState(price);
  const [isTracked, setIsTracked] = useState(tracked);
  const [time, setTime] = useState(generateRandomTime());
  const [user, setUser] = useState(generateRandomUser(solanaAddresses));
  const [isFlashing, setIsFlashing] = useState(false);
  const timerRef = useRef(null);

  const startCountdown = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    //@ts-ignore
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 500);
          setUser(generateRandomUser(solanaAddresses));
          setCurrPrice((prev) => parseFloat((prev + 0.0001).toFixed(4)));
          return 15;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  }, []);

  const formattedTime = useMemo(() => {
    const durationTime = dayjs.duration(time, "seconds");
    return durationTime.format("HH:mm:ss");
  }, [time]);

  useMemo(() => {
    startCountdown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startCountdown]);

  const handleTrack = (event: boolean) => {
    if (!isConnected) {
      triggerLogin();
      return;
    }
    if (handleCustomTrack) {
      handleCustomTrack(event, id);
      return;
    }
    setIsTracked((prev) => !prev);
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
    }
  };

  return (
    <Card
      className={`border-none transition ${isFlashing ? "animate-flash" : ""}`}
    >
      <CardBody className="overflow-hidden p-0">
        <Link href={`/item/${id}`} id="item-list-card-link">
          <Image
            isZoomed
            alt={title}
            className="w-full h-full min-h-[219px] object-cover rounded-none cursor-pointer"
            src={imgUrl}
          />
        </Link>
        {!bamPros && (
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
      </CardBody>
      <CardFooter className="flex-col pt-0">
        <h4 className="pt-3 font-medium text-base text-center text-ellipsis overflow-hidden w-full whitespace-nowrap">
          {title}
        </h4>
        <div className="text-left w-full pt-2">
          <div className="flex justify-start items-center">
            <p className="w-[5rem] min-w-[5rem] text-sm font-medium text-gray-500 dark:text-textcontent1">
              Leader
            </p>
            <p className="text-sm font-normal text-ellipsis overflow-hidden whitespace-nowrap">
              {user}
            </p>
          </div>
          <div className="flex justify-start items-center">
            <p className="w-[5rem] text-sm font-medium text-gray-500 dark:text-textcontent1">
              Price
            </p>
            <p className="text-sm font-normal">{currPrice}</p>
            <Image
              className="ml-1"
              src="images/sol-logo-tp.svg"
              width={14}
              height={19}
              alt="solana logo"
            />
          </div>
          <div className="flex justify-start items-center">
            <p className="w-[5rem] text-sm font-medium text-gray-500 dark:text-textcontent1">
              Time Left
            </p>
            <p className="text-sm font-normal text-yellow-500">
              {formattedTime}
            </p>
          </div>
        </div>
        {showActive ? (
          <Chip color="success" className="mt-3">
            Active
          </Chip>
        ) : (
          <div className="w-full flex items-center justify-between pt-3 gap-4">
            <Button
              as={Link}
              href={`/item/${id}`}
              color="primary"
              className="w-[50%]"
            >
              Bid
            </Button>
            {isConnected && isTracked ? (
              <Button
                onClick={() => handleTrack(false)}
                color="secondary"
                className="w-[50%]"
              >
                Tracked
              </Button>
            ) : (
              <Button
                onClick={() => handleTrack(true)}
                color="secondary"
                variant="ghost"
                className="w-[50%]"
              >
                Track
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};


import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Slider } from "@nextui-org/slider";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useAuthContext } from "../provider/auth-provider";
import { Divider } from "@nextui-org/divider";
dayjs.extend(duration);

interface ItemDetailCardProps {
  item: any;
  setItem: any;
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

export const ItemDetailCard: FC<ItemDetailCardProps> = ({ item, setItem }) => {
  let finalData = "0";
  if (typeof window !== "undefined") {
    const storageData = localStorage.getItem("bidcoinbalance");
    if (storageData) {
      finalData = JSON.parse(storageData);
    } else {
      finalData = "999";
      localStorage.setItem("bidcoinbalance", "999");
    }
  }
  const { isConnected, triggerLogin, getAccounts, provider } = useAuthContext();
  const [bidcoinBalance, setBidcoinBalance] = useState(Number(finalData));
  const [currPrice, setCurrPrice] = useState<number>(item.price);
  const [isTracked, setIsTracked] = useState<boolean>(item.tracked);
  const [time, setTime] = useState(generateRandomTime());
  const [user, setUser] = useState(generateRandomUser(solanaAddresses));
  const [isFlashing, setIsFlashing] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [newAutoBidAmount, setNewAutoBidAmount] = useState(200);
  const timerRef = useRef(null);
  const autoIntervalRef = useRef(null);

  const startCountdown = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    //@ts-ignore
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 500);
          const newRandomUser = generateRandomUser(solanaAddresses);
          setUser(newRandomUser);
          setCurrPrice((prev) => parseFloat((prev + 0.0001).toFixed(4)));

          const storageData = localStorage.getItem("allItems");
          if (storageData) {
            const parsedData = JSON.parse(storageData);
            const newData = parsedData.map((el: any) => {
              if (el.id === item.id) {
                return {
                  ...el,
                  leader: newRandomUser,
                  price: parseFloat((el.price + 0.0001).toFixed(4)),
                  bidHistory: [...el.bidHistory, newRandomUser],
                };
              }
              return el;
            });
            localStorage.setItem("allItems", JSON.stringify(newData));
          }
          setItem((prev: any) => ({
            ...prev,
            leader: newRandomUser,
            price: parseFloat((prev.price + 0.0001).toFixed(4)),
            bidHistory: [...prev.bidHistory, newRandomUser],
          }));
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
    setIsTracked((prev) => !prev);
    const storageData = localStorage.getItem("allItems");
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      const newData = parsedData.map((el: any) => {
        if (el.id === item.id) {
          return { ...el, tracked: event };
        }
        return el;
      });
      localStorage.setItem("allItems", JSON.stringify(newData));
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log("fetchProfileData");
      try {
        const accounts = await getAccounts();
        setWalletAddress(accounts?.[0] || "");
      } catch (error) {
        console.log(error);
      } finally {
        // setIsLoading(false);
      }
    };

    if (isConnected && provider) fetchProfileData();
  }, [isConnected, provider]);

  useEffect(() => {
    if (
      isConnected &&
      provider &&
      item.autoBid.active &&
      item.autoBid.amountRemained < 1
    ) {
      handleCancelAuto();
    }
  }, [item, isConnected, provider]);

  useEffect(() => {
    const triggerExistingAutoBid = async () => {
      try {
        const accounts = await getAccounts();
        setWalletAddress(accounts?.[0] || "");
        // @ts-ignore
        autoIntervalRef.current = setInterval(
          () => autoBidLogic(false, accounts?.[0]),
          20000
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (
      isConnected &&
      provider &&
      item.autoBid.active &&
      item.autoBid.amountRemained > 1 &&
      !autoIntervalRef.current
    ) {
      triggerExistingAutoBid();
    }
  }, [item, isConnected, provider]);

  const handleManualBid = () => {
    if (!isConnected) triggerLogin();
    setUser(walletAddress);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 500);
    setCurrPrice((prev) => parseFloat((prev + 0.0001).toFixed(4)));
    setTime(15);

    setBidcoinBalance((prev) => prev - 1);
    const storageBalance = localStorage.getItem("bidcoinbalance");
    if (storageBalance) {
      const parsedData = JSON.parse(storageBalance);
      const newBalance = Number(parsedData) - 1;
      localStorage.setItem("bidcoinbalance", JSON.stringify(newBalance));
    }

    const storageData = localStorage.getItem("allItems");
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      const newData = parsedData.map((el: any) => {
        if (el.id === item.id) {
          return {
            ...el,
            leader: walletAddress,
            price: parseFloat((el.price + 0.0001).toFixed(4)),
            bidHistory: [...el.bidHistory, walletAddress],
          };
        }
        return el;
      });
      localStorage.setItem("allItems", JSON.stringify(newData));
    }
    setItem((prev: any) => ({
      ...prev,
      leader: walletAddress,
      price: parseFloat((prev.price + 0.0001).toFixed(4)),
      bidHistory: [...prev.bidHistory, walletAddress],
    }));
  };

  const autoBidLogic = (firstCall?: boolean, walletParent?: string) => {
    setUser(walletParent || walletAddress);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 500);
    setCurrPrice((prev) => parseFloat((prev + 0.0001).toFixed(4)));
    setTime(15);

    if (firstCall) {
      setBidcoinBalance((prev) => prev - newAutoBidAmount);
      const storageBalance = localStorage.getItem("bidcoinbalance");
      if (storageBalance) {
        const parsedData = JSON.parse(storageBalance);
        const newBalance = Number(parsedData) - newAutoBidAmount;
        localStorage.setItem("bidcoinbalance", JSON.stringify(newBalance));
      }
    }

    const storageData = localStorage.getItem("allItems");
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      const newData = parsedData.map((el: any) => {
        if (el.id === item.id) {
          return {
            ...el,
            leader: walletParent || walletAddress,
            price: parseFloat((el.price + 0.0001).toFixed(4)),
            bidHistory: [...el.bidHistory, walletParent || walletAddress],
            autoBid: {
              active: true,
              amountRemained: firstCall
                ? newAutoBidAmount - 1
                : el.autoBid.amountRemained - 1,
            },
          };
        }
        return el;
      });
      localStorage.setItem("allItems", JSON.stringify(newData));
    }
    setItem((prev: any) => ({
      ...prev,
      leader: walletParent || walletAddress,
      price: parseFloat((prev.price + 0.0001).toFixed(4)),
      bidHistory: [...prev.bidHistory, walletParent || walletAddress],
      autoBid: {
        active: true,
        amountRemained: firstCall
          ? newAutoBidAmount - 1
          : prev.autoBid.amountRemained - 1,
      },
    }));
  };

  const handleAutoBid = () => {
    if (!isConnected) {
      triggerLogin();
      return;
    }
    if (newAutoBidAmount < 1 || bidcoinBalance < 1) return;

    autoBidLogic(true);
    // @ts-ignore
    autoIntervalRef.current = setInterval(autoBidLogic, 20000);
  };

  const handleCancelAuto = () => {
    if (!isConnected) {
      triggerLogin();
      return;
    }
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
      const storageData = localStorage.getItem("allItems");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const newData = parsedData.map((el: any) => {
          if (el.id === item.id) {
            return {
              ...el,
              autoBid: {
                active: false,
                amountRemained: 0,
              },
            };
          }
          return el;
        });
        localStorage.setItem("allItems", JSON.stringify(newData));
      }
      const currentRemainedBalance = item.autoBid.amountRemained;
      const storageBalance = localStorage.getItem("bidcoinbalance");
      if (storageBalance) {
        const parsedData = JSON.parse(storageBalance);
        const newBalance = Number(parsedData) + currentRemainedBalance;
        localStorage.setItem("bidcoinbalance", JSON.stringify(newBalance));
      }
      setBidcoinBalance((prev) => prev + currentRemainedBalance);
      setItem((prev: any) => ({
        ...prev,
        autoBid: {
          active: false,
          amountRemained: 0,
        },
      }));
    }
  };

  return (
    <Card className="border-none h-fit min-h-[450px]">
      <CardBody className="overflow-hidden">
        <h4 className="font-medium text-xl text-center ">
          {item.content.metadata.name}
        </h4>
        <h4 className="font-normal text-sm text-center pt-3">
          {item.content.metadata.description}
        </h4>
        <div className="text-left w-full pt-10">
          <div
            className={`flex justify-start items-center mb-3 transition ${isFlashing ? "animate-flash" : ""}`}
          >
            <p className="w-[7rem] min-w-[7rem] text-base font-medium text-gray-500 dark:text-textcontent1">
              Leader
            </p>
            <p
              className={`text-base font-normal text-ellipsis overflow-hidden whitespace-nowrap ${user === walletAddress ? "text-yellow-500" : ""}`}
            >
              {user}
            </p>
          </div>
          <div className="flex justify-start items-center mb-3">
            <p className="w-[7rem] text-base font-medium text-gray-500 dark:text-textcontent1">
              Price
            </p>
            <p className="text-base font-normal">{currPrice}</p>
            <Image
              className="ml-1"
              src="/images/sol-logo-tp.svg"
              width={15}
              height={21}
              alt="solana logo"
            />
          </div>
          <div className="flex justify-start items-center mb-3">
            <p className="w-[7rem] text-base font-medium text-gray-500 dark:text-textcontent1">
              Time Left
            </p>
            <p className="text-base font-normal text-yellow-500">
              {formattedTime}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-start pt-5 gap-4">
          <Button
            color="primary"
            className="w-[50%]"
            onClick={handleManualBid}
            isDisabled={isConnected && item.autoBid.active}
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
        <div className="mt-5">
          <Divider />
          <h4 className="font-medium text-xl text-center pt-3 pb-5">
            Auto Bid
          </h4>
          {isConnected && item.autoBid.active && (
            <Chip color="success" className="mb-3">
              Active ({item.autoBid.amountRemained} bid remained)
            </Chip>
          )}
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <h4 className="font-normal text-sm text-center">
                Please login to use Auto Bid
              </h4>
              <Button
                onClick={triggerLogin}
                color="success"
                className="text-black"
              >
                Login
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-3 flex justify-start items-center">
                <p className="w-[9rem] min-w-[9rem] text-base font-medium text-gray-500 dark:text-textcontent1">
                  Bid Balance
                </p>
                <p className="text-base font-normal">{bidcoinBalance}</p>
              </div>
              <Slider
                label={
                  <p className="text-base font-medium text-gray-500 dark:text-textcontent1">
                    Bid Amount
                  </p>
                }
                step={5}
                maxValue={bidcoinBalance}
                minValue={0}
                defaultValue={200}
                //@ts-ignore
                onChange={setNewAutoBidAmount}
                className="max-w-md"
              />
              <div className="w-full flex items-center justify-start pt-8 gap-4">
                <Button
                  color="primary"
                  className="w-[50%]"
                  onClick={handleAutoBid}
                  isDisabled={item.autoBid.active}
                >
                  Set Auto Bid
                </Button>
                <Button
                  color="danger"
                  variant="ghost"
                  className="w-[50%]"
                  isDisabled={!item.autoBid.active}
                  onClick={handleCancelAuto}
                >
                  Cancel Auto Bid
                </Button>
              </div>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

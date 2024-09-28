"use client";
// https://github.com/nextui-org/nextui/issues/1403#issuecomment-1678863519

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Card, CardBody } from "@nextui-org/card";

export const FaqCard = () => {
  return (
    <Card className="border-none h-fit sm:mt-6 mt-3">
      <CardBody className="overflow-hidden">
        <h4 className="font-medium text-xl text-center">FAQS</h4>
        <Accordion
          itemClasses={{
            title: "font-normal text-sm text-gray-500 dark:text-textcontent1",
            content: "font-normal text-sm",
          }}
        >
          <AccordionItem key="1" aria-label="How To Bid?" title="How To Bid?">
            Step 1: Connect your wallet.
            <br />
            Step 2: Acquire bid.
            <br />
            Step 3: Find an auction you are interested in.
            <br />
            Step 4: Place your bid.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="How To Track Auction Progress?"
            title="How To Track Auction Progress?"
          >
            Use the "Track" button to add the auction to your dashboard for live
            updates on bids and auctions.
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="What Are Payment Options?"
            title="What Are Payment Options?"
          >
            Pay using Bidcoin or other supported cryptocurrencies directly from
            your connected wallet.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Can I Cancel a Winning Bid?"
            title="Can I Cancel a Winning Bid?"
          >
            Once confirmed, winning bids are final. Cancellation is not allowed
            unless specified.
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="I Won, Now What?"
            title="I Won, Now What?"
          >
            After payment, arrange for pickup up delivery as specified. Digital
            items may be transferred directly to your wallet.
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};

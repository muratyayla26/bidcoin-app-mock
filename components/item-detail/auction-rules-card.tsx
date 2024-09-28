"use client";
// https://github.com/nextui-org/nextui/issues/1403#issuecomment-1678863519

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Card, CardBody } from "@nextui-org/card";

export const AuctionRulesCard = () => {
  return (
    <Card className="border-none h-fit">
      <CardBody className="overflow-hidden">
        <h4 className="font-medium text-xl text-center">Auction Rules</h4>
        <Accordion
          itemClasses={{
            title: "font-normal text-sm text-gray-500 dark:text-textcontent1",
            content: "font-normal text-sm",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="No Jumper Biddings"
            title="No Jumper Biddings"
          >
            Bidding is locked for new participants once the current price
            reaches 5-10% of the item's fair value. The rule is designed to
            prevent late entries from disrupting the auction dynamics
            established by the early bidders.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Newbies-Only Auction"
            title="Newbies-Only Auction"
          >
            Bidding is limited to users who have participated in 25 or fewer
            auctions. Once a user has participated in more then 25 auctions,
            they will not be able to participate those auctions.
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};

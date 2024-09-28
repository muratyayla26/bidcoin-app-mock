"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

export const LeftFilters = ({
  handleTagChange,
}: {
  handleTagChange: (value: string[]) => void;
}) => {
  return (
    <Card className="border-none h-fit w-[260px] min-w-[260px] mr-6 sticky top-[5.5rem]">
      <CardBody className="overflow-hidden">
        <Accordion
          isCompact
          defaultExpandedKeys={["1", "2"]}
          selectionMode="multiple"
        >
          <AccordionItem key="1" aria-label="Accordion 1" title="Tags">
            <CheckboxGroup
              defaultValue={["newbies", "bampros"]}
              size="sm"
              className="mb-3"
              onChange={handleTagChange}
            >
              <Checkbox value="newbies">Newbies</Checkbox>
              <Checkbox value="bampros">BAM Pros</Checkbox>
            </CheckboxGroup>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Price">
            <Select label="Select a currency" className="max-w-xs " size="sm">
              <SelectItem key="USD">USD</SelectItem>
              <SelectItem key="SOL">SOL</SelectItem>
              <SelectItem key="ETH">ETH</SelectItem>
            </Select>
            <div className="flex items-center justify-between gap-1 my-3">
              <Input size="sm" type="text" label="Min" />
              <p className="text-base">to</p>
              <Input size="sm" type="text" label="Max" />
            </div>
            <Button color="primary" fullWidth>
              Apply
            </Button>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};

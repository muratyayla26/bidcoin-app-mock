import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Snippet } from "@nextui-org/snippet";
import { v4 as uuidv4 } from "uuid";

export const BidHistory = ({ bidHistory }: { bidHistory: string[] }) => {
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

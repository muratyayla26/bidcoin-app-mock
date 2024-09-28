import { ItemListCard } from "../common/item-list-card";

export const ItemsList = ({ results }: { results: any }) => {
  return (
    <div className="gap-3 sm:gap-6 grid grid-cols-2 sm:grid-cols-5">
      {results.slice(0, 10).map((item: any) => (
        <ItemListCard
          key={item.id}
          id={item.id}
          imgUrl={item.content.links.image}
          title={item.content.metadata.name}
          leader={item.leader}
          price={item.price}
          tracked={item.tracked}
          bamPros={item.bamPros}
        />
      ))}
    </div>
  );
};

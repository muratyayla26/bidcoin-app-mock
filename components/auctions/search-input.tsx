import { Input } from "@nextui-org/input";
import { SearchIcon } from "../common/icons";

export const SearchInput = () => {
  return (
    <div className="w-full sticky top-0 mb-6 z-[40]">
      <Input
        label="Search"
        isClearable
        type="email"
        placeholder="Search by name or trait"
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default-100/60",
            "backdrop-blur-md",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default-200/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
      />
    </div>
  );
};

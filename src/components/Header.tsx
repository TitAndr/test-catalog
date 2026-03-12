import type { ChangeEvent, KeyboardEvent } from "react";
import logoIcon from "@/assets/icons/logo.svg";
import searchIcon from "@/assets/icons/search.svg";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export const Header = ({
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: HeaderProps) => {

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <header className="border-b border-[#F0F0F0] bg-white lg:h-28">
      <div
        className="mx-auto flex h-full w-full flex-col items-start justify-center gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:py-0"
        style={{ maxWidth: 1450 }}
      >
        <div className="flex items-center gap-3">
          <img
            src={logoIcon}
            alt="AQVEX logo"
            className="h-12.5 w-46.75 shrink-0 object-contain"
            loading="lazy"
          />
        </div>

        <div className="relative w-full lg:max-w-114">
          <button
            type="button"
            onClick={onSearchSubmit}
            aria-label="Поиск"
            className="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43A0FD]"
          >
            <img src={searchIcon} alt="" className="size-5" loading="lazy" />
          </button>
          <input
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Поиск"
            className="h-11 w-full rounded-xl bg-[#F6F7F9] pr-5 pl-12 text-lg leading-[140%] tracking-[-0.02em] text-[#182A42] outline-none ring-1 ring-transparent transition placeholder:text-[#182A42] focus:ring-[#43A0FD]"
          />
        </div>
      </div>
    </header>
  );
};

import { useRef, useState } from "react";
import sortIcon from "@/assets/icons/arrows.svg";
import { useClickOutside } from "@/hooks";
import {
  getSortOptionLabel,
  SORT_OPTIONS,
  type SortOption,
} from "@/types/catalog";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/catalog/ProductCard";

interface ProductGridProps {
  products: Product[];
  foundCount: number;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
}

interface SortControlProps {
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
}

const sortButtonClassName =
  "inline-flex cursor-pointer items-center gap-2 rounded-md bg-transparent text-base leading-[100%] font-medium tracking-[-0.02em] text-[#182A42] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43A0FD]";

const sortOptionClassName =
  "w-full px-4 py-2 text-left text-sm font-medium tracking-[-0.02em] transition hover:bg-[#F6F7F9]";

const getSortOptionStateClassName = (isActive: boolean) =>
  isActive ? "text-[#43A0FD]" : "text-[#182A42]";

const EmptyResults = () => (
  <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
    Ничего не найдено по вашему запросу
  </section>
);

const SortControl = ({ sortValue, onSortChange }: SortControlProps) => {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useClickOutside(sortRef, sortOpen, () => setSortOpen(false));

  return (
    <div className="relative" ref={sortRef}>
      <button
        type="button"
        onClick={() => setSortOpen((open) => !open)}
        className={sortButtonClassName}
        aria-haspopup="listbox"
        aria-expanded={sortOpen}
      >
        <img
          src={sortIcon}
          alt="Sort"
          className="size-4 shrink-0"
          loading="lazy"
        />
        <span className="underline decoration-[#182A42] underline-offset-1">
          {getSortOptionLabel(sortValue)}
        </span>
        <span
          className={`text-xs leading-none text-[#BFC7D2] transition ${sortOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {sortOpen && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 min-w-58 overflow-hidden rounded-xl border border-[#EBEBEB] bg-white py-1 shadow-lg"
        >
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onSortChange(option.value);
                  setSortOpen(false);
                }}
                className={`${sortOptionClassName} ${getSortOptionStateClassName(
                  option.value === sortValue,
                )}`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProductsCount = ({ count }: { count: number }) => (
  <p className="text-base leading-5.25 font-medium tracking-[-0.02em] text-[#182A42]/50">
    {count} товаров
  </p>
);

export const ProductGrid = ({
  products,
  foundCount,
  sortValue,
  onSortChange,
}: ProductGridProps) => {
  if (products.length === 0) {
    return <EmptyResults />;
  }

  return (
    <section className="pt-12.5">
      <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <ProductsCount count={foundCount} />
        <SortControl sortValue={sortValue} onSortChange={onSortChange} />
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-15 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

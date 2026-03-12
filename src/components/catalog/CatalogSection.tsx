import { Pagination } from "@/components/catalog/Pagination";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import type { SortOption } from "@/types/catalog";
import type { Product } from "@/types/product";

interface CatalogSectionProps {
  isLoading: boolean;
  error: string | null;
  products: Product[];
  foundCount: number;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CatalogSection = ({
  isLoading,
  error,
  products,
  foundCount,
  sortValue,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
}: CatalogSectionProps) => {
  if (isLoading) {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
        Загрузка товаров...
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">
        {error}
      </section>
    );
  }

  return (
    <>
      <ProductGrid
        products={products}
        foundCount={foundCount}
        sortValue={sortValue}
        onSortChange={onSortChange}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

import { useCallback, useEffect, useMemo } from "react";
import { useCatalogFetch } from "@/hooks/useCatalogFetch";
import { useCatalogSearch } from "@/hooks/useCatalogSearch";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import {
  DEFAULT_SORT_OPTION,
  isSortOption,
  type SortOption,
} from "@/types/catalog";
import type { Product } from "@/types/product";

const PRODUCTS_PER_PAGE = 9;
const SORT_STORAGE_KEY = "catalog.sort";
const PAGE_STORAGE_KEY = "catalog.page";

const parseSort = (raw: string): SortOption =>
  isSortOption(raw) ? raw : DEFAULT_SORT_OPTION;

const serializeSort = (value: SortOption): string => value;

const parsePage = (raw: string): number => {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
};

const serializePage = (value: number): string => String(value);

const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  return products.slice().sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating - a.rating;
      case "discount-desc":
        return b.discount_percent - a.discount_percent;
      case "name-asc":
        return a.name.localeCompare(b.name, "ru");
      default:
        return 0;
    }
  });
};

export const useCatalog = () => {
  const { products, isLoading, error } = useCatalogFetch();
  const [sort, setSort] = useLocalStorageState<SortOption>(
    SORT_STORAGE_KEY,
    DEFAULT_SORT_OPTION,
    {
      deserialize: parseSort,
      serialize: serializeSort,
    },
  );
  const [currentPage, setCurrentPage] = useLocalStorageState<number>(
    PAGE_STORAGE_KEY,
    1,
    {
      deserialize: parsePage,
      serialize: serializePage,
    },
  );

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const {
    searchInput,
    searchQuery,
    handleSearchInputChange,
    handleSearchSubmit,
  } = useCatalogSearch({ onResetPage: resetPage });

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearch),
    );
  }, [products, searchQuery]);

  const filteredAndSortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE),
  );

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredAndSortedProducts]);

  useEffect(() => {
    if (!isLoading && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, isLoading, setCurrentPage, totalPages]);

  return {
    searchInput,
    handleSearchInputChange,
    handleSearchSubmit,
    isLoading,
    error,
    sort,
    setSort,
    currentPage,
    setCurrentPage,
    totalPages,
    foundCount: filteredAndSortedProducts.length,
    pagedProducts,
  };
};

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "discount-desc"
  | "name-asc";

export const SORT_OPTION_VALUES: ReadonlyArray<SortOption> = [
  "price-asc",
  "price-desc",
  "rating-desc",
  "discount-desc",
  "name-asc",
];

export const DEFAULT_SORT_OPTION: SortOption = "rating-desc";

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "rating-desc", label: "По популярности" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "discount-desc", label: "По скидке" },
  { value: "name-asc", label: "По названию" },
];

export const isSortOption = (value: string): value is SortOption =>
  SORT_OPTION_VALUES.includes(value as SortOption);

export const getSortOptionLabel = (value: SortOption): string => {
  return (
    SORT_OPTIONS.find((option) => option.value === value)?.label ??
    "По популярности"
  );
};

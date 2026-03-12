import { useCallback, useState } from "react";

interface UseCatalogSearchOptions {
  onResetPage: () => void;
}

export const useCatalogSearch = ({ onResetPage }: UseCatalogSearchOptions) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = useCallback(
    (value: string) => {
      setSearchInput(value);

      if (value === "") {
        setSearchQuery("");
        onResetPage();
      }
    },
    [onResetPage],
  );

  const handleSearchSubmit = useCallback(() => {
    const nextQuery = searchInput.trim();

    if (nextQuery !== searchQuery) {
      setSearchQuery(nextQuery);
      onResetPage();
    }
  }, [onResetPage, searchInput, searchQuery]);

  return {
    searchInput,
    searchQuery,
    handleSearchInputChange,
    handleSearchSubmit,
  };
};

import { CatalogSection } from "@/components/catalog/CatalogSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useCatalog } from "@/hooks";

const App = () => {
  const {
    searchInput,
    handleSearchInputChange,
    handleSearchSubmit,
    ...catalogProps
  } = useCatalog();

  return (
    <div className="min-h-screen bg-white">
      <Header
        searchValue={searchInput}
        onSearchChange={handleSearchInputChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="mx-auto w-full px-4" style={{ maxWidth: 1450 }}>
        <CatalogSection
          {...catalogProps}
          products={catalogProps.pagedProducts}
          sortValue={catalogProps.sort}
          onSortChange={catalogProps.setSort}
          onPageChange={catalogProps.setCurrentPage}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import { fetchProducts } from "@/services/productsApi";
import type { Product } from "@/types/product";

export const useCatalogFetch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchProducts();

        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Сталася помилка при завантаженні каталогу");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    isLoading,
    error,
  };
};

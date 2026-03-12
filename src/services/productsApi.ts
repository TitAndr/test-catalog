import type { Product, ProductsResponse } from "@/types/product";
import PLACEHOLDER_IMAGE from "@/assets/product-item.png";

const API_BASE_URL = import.meta.env.DEV
  ? "/api/v1/products"
  : "https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/api/v1/products";

const IMAGE_BASE_URL =
  "https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/images";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Не вдалося завантажити товари");
  }

  const json = (await response.json()) as ProductsResponse;
  return json.data.products;
};

export const getProductImageUrl = (image: string): string => {
  const normalizedImage = image?.trim().replace(/^\/+/, "");

  if (!normalizedImage) {
    return PLACEHOLDER_IMAGE;
  }

  return `${IMAGE_BASE_URL}/${normalizedImage}`;
};

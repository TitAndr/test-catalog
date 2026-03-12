export interface ProductVolume {
  id: string;
  label: string;
  in_stock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  old_price: number;
  discount_percent: number;
  currency: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  category: string;
  volumes: ProductVolume[];
  selected_volume_id: string;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
  };
}

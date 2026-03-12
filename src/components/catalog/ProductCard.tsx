import { useRef, useState } from "react";
import binIcon from "@/assets/icons/bin.svg";
import checkIcon from "@/assets/icons/check.svg";
import { useClickOutside } from "@/hooks";
import { getProductImageUrl } from "@/services/productsApi";
import type { Product, ProductVolume } from "@/types/product";
import PLACEHOLDER_IMAGE from "@/assets/product-item.png";
import DiscountIcon from "@/assets/icons/Discount";

interface ProductCardProps {
  product: Product;
}

const imageClassName =
  "aspect-square w-full rounded-2xl bg-[#F7F8FA] object-contain p-6 sm:p-8";

const ProductImage = ({
  imageSrc,
  productName,
  onError,
}: {
  imageSrc: string;
  productName: string;
  onError: () => void;
}) => (
  <div className="relative mb-4.5">
    <img
      src={imageSrc}
      alt={productName}
      onError={onError}
      className={imageClassName}
    />
  </div>
);

const PriceSection = ({
  oldPrice,
  price,
  currency,
  discountPercent,
}: {
  oldPrice: number;
  price: number;
  currency: string;
  discountPercent?: number;
}) => (
  <div className="flex items-center gap-2">
    <div className="relative text-[22px] leading-[100%] font-medium tracking-[-0.02em] text-[#8090A4]">
      {oldPrice}
      <span className="absolute left-0 top-1/2 h-0.5 w-9.75 -translate-y-1/2 bg-[#FF2741]" />
    </div>

    <span className="bg-linear-to-r from-[#003181] to-[#2288ED] bg-clip-text text-[22px] leading-[100%] font-medium tracking-[-0.02em] text-transparent">
      {price} {currency}
    </span>

    {!!discountPercent && (
      <div className="relative ml-2 inline-flex h-4.5 items-center bg-[#FF2741] px-1.25">
        <DiscountIcon className="absolute top-1/2 -left-2 -translate-y-1/2" />
        <span className="text-sm leading-[100%] font-bold tracking-[-0.02em] text-white">
          {discountPercent}%
        </span>
      </div>
    )}
  </div>
);

const RatingSection = ({
  rating,
  reviewsCount,
}: {
  rating: number;
  reviewsCount: number;
}) => {
  const normalizedRating = Math.max(0, Math.min(5, rating ?? 0));

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5 text-[#43A0FD]">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className="relative text-xs leading-none text-[#E6E9ED]"
          >
            ★
            <span
              className="absolute inset-0 overflow-hidden text-[#43A0FD]"
              style={{
                width: `${Math.max(0, Math.min(1, normalizedRating - index)) * 100}%`,
              }}
            >
              ★
            </span>
          </span>
        ))}
      </div>
      <span className="text-sm leading-[100%] tracking-[-0.02em] text-[#182A42] underline cursor-pointer">
        {reviewsCount}
      </span>
    </div>
  );
};

const StockInfo = ({
  inStock,
  category,
}: {
  inStock: boolean;
  category: string;
}) => (
  <div className="flex items-center gap-3.5 text-sm tracking-[-0.02em]">
    <span className="flex items-center gap-2 text-[#182A42]">
      {inStock ? (
        <img
          src={checkIcon}
          alt="In stock"
          className="size-4 shrink-0"
          loading="lazy"
        />
      ) : (
        <span className="size-4 rounded-full bg-[#E6E9ED]" />
      )}
      {inStock ? "В наличии" : "Нет в наличии"}
    </span>
    <span className="size-4 rounded-full bg-[#E6E9ED]" />
    <span className="text-[#8090A4]">{category}</span>
  </div>
);

const volumeDropdownClassName =
  "flex h-12.5 w-full items-center justify-center gap-2 rounded-[15px] border-[1.5px] border-[#EBEBEB] bg-white text-lg leading-[100%] font-medium tracking-[-0.02em] text-[#182A42] transition hover:border-[#d8d8d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43A0FD]";

const volumeOptionClassName =
  "flex w-full items-center justify-between px-4 py-2.5 text-base font-medium tracking-[-0.02em] transition hover:bg-[#F6F7F9]";

const getVolumeOptionState = (isSelected: boolean, isInStock: boolean) =>
  `${isSelected ? "text-[#43A0FD]" : "text-[#182A42]"} ${!isInStock ? "opacity-70" : ""}`;

interface VolumeSelectorProps {
  volumes: ProductVolume[];
  selectedVolume: ProductVolume | undefined;
  onSelectVolume: (volume: ProductVolume) => void;
  dropdownOpen: boolean;
  onToggleDropdown: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

const VolumeSelector = ({
  volumes,
  selectedVolume,
  onSelectVolume,
  dropdownOpen,
  onToggleDropdown,
  dropdownRef,
}: VolumeSelectorProps) => (
  <div className="relative sm:w-30.75 sm:flex-none flex-1" ref={dropdownRef}>
    <button
      type="button"
      onClick={() => onToggleDropdown(!dropdownOpen)}
      className={volumeDropdownClassName}
    >
      {selectedVolume?.label ?? volumes[0]?.label}
      <span className="text-xs opacity-30">▼</span>
    </button>

    {dropdownOpen && (
      <ul className="absolute bottom-full left-0 z-10 mb-1 w-full overflow-hidden rounded-[15px] border border-[#EBEBEB] bg-white shadow-lg">
        {volumes.map((vol) => (
          <li key={vol.id}>
            <button
              type="button"
              onClick={() => {
                onSelectVolume(vol);
                onToggleDropdown(false);
              }}
              className={`${volumeOptionClassName} ${getVolumeOptionState(
                selectedVolume?.id === vol.id,
                vol.in_stock,
              )}`}
            >
              {vol.label}
              {selectedVolume?.id === vol.id && (
                <span className="text-xs text-[#43A0FD]">✓</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const cartButtonClassName =
  "flex h-12.5 items-center justify-center gap-3 rounded-[15px] bg-[#E8F4FF] text-lg leading-[100%] font-medium tracking-[-0.02em] text-[#182A42] transition hover:bg-[#d9edff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43A0FD] disabled:cursor-not-allowed disabled:bg-slate-200";

const AddToCartButton = ({
  hasVolumes,
  isDisabled,
}: {
  hasVolumes: boolean;
  isDisabled: boolean;
}) => (
  <button
    type="button"
    disabled={isDisabled}
    className={`${cartButtonClassName} ${
      hasVolumes ? "flex-1 sm:w-43.25 sm:flex-none" : "w-full"
    }`}
  >
    <img src={binIcon} alt="" className="h-5 w-6 shrink-0" loading="lazy" />В
    корзину
  </button>
);

export const ProductCard = ({ product }: ProductCardProps) => {
  const [imageSrc, setImageSrc] = useState(getProductImageUrl(product.image));

  const hasVolumes = product.volumes && product.volumes.length > 0;
  const setInitVolume = () =>
    product.volumes.find((v) => v.id === product.selected_volume_id) ??
    product.volumes[0];

  const [selectedVolume, setSelectedVolume] =
    useState<ProductVolume>(setInitVolume);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, dropdownOpen, () => setDropdownOpen(false));

  return (
    <article className="group mx-auto w-full max-w-86.75 xl:mx-0">
      <ProductImage
        imageSrc={imageSrc}
        productName={product.name}
        onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
      />

      <div className="flex flex-col gap-8">
        <PriceSection
          oldPrice={product.old_price}
          price={product.price}
          currency={product.currency}
          discountPercent={product.discount_percent}
        />

        <div className="flex flex-col gap-4">
          <h3 className="line-clamp-3 min-h-18.75 text-lg leading-[140%] font-medium tracking-[-0.02em] text-[#182A42]">
            {product.name}
          </h3>
          <RatingSection
            rating={product.rating}
            reviewsCount={product.reviews_count}
          />
        </div>

        <StockInfo inStock={product.in_stock} category={product.category} />

        <div className="flex items-start gap-2">
          {hasVolumes && (
            <VolumeSelector
              volumes={product.volumes}
              selectedVolume={selectedVolume}
              onSelectVolume={setSelectedVolume}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={setDropdownOpen}
              dropdownRef={dropdownRef}
            />
          )}

          <AddToCartButton
            hasVolumes={hasVolumes}
            isDisabled={!product.in_stock}
          />
        </div>
      </div>
    </article>
  );
};

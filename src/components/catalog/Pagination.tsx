import leftArrowIcon from "@/assets/icons/left.svg";
import rightArrowIcon from "@/assets/icons/right.svg";

const DOTS = "dots" as const;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | typeof DOTS;

const getPagesToRender = (
  currentPage: number,
  totalPages: number,
): PageItem[] => {
  const allPages = Array.from({ length: totalPages }, (_, index) => index + 1);

  if (totalPages <= 7) {
    return allPages;
  }

  return [
    1,
    ...(currentPage > 3 ? [DOTS] : []),
    ...allPages.filter(
      (page) =>
        page >= Math.max(2, currentPage - 1) &&
        page <= Math.min(totalPages - 1, currentPage + 1),
    ),
    ...(currentPage < totalPages - 2 ? [DOTS] : []),
    totalPages,
  ];
};

const arrowButtonClassName =
  "flex size-11.5 items-center justify-center rounded-[15px] text-[#182A42] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50";

const pageButtonClassName =
  "size-11.5 rounded-[15px] border-[1.5px] text-base leading-[100%] font-bold tracking-[-0.02em] transition";

const getPageButtonStateClassName = (isActive: boolean) =>
  isActive
    ? "border-[#43A0FD] bg-white text-[#182A42]"
    : "border-transparent bg-white text-[#182A42] hover:bg-slate-100";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pagesToRender = getPagesToRender(currentPage, totalPages);

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-3 pb-12 pt-8"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={arrowButtonClassName}
      >
        <img
          src={leftArrowIcon}
          alt="Previous page"
          className="h-3 w-6 shrink-0"
          loading="lazy"
        />
      </button>

      {pagesToRender.map((page, index) =>
        page === DOTS ? (
          <span key={`dots-${index}`} className="px-1 text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`${pageButtonClassName} ${getPageButtonStateClassName(
              page === currentPage,
            )}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={arrowButtonClassName}
      >
        <img
          src={rightArrowIcon}
          alt="Next page"
          className="h-3 w-6 shrink-0"
          loading="lazy"
        />
      </button>
    </nav>
  );
};

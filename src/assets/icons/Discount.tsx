const DiscountIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      width="9"
      height="18"
      viewBox="0 0 9 18"
      fill="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.63898 1.32L0.660455 7.0189C-0.220192 8.186 -0.220192 9.814 0.660455 10.9811L5.63898 16.68C6.26075 17.5072 7.25424 18 8.29309 18V0C7.25424 0 6.26075 0.4928 5.63898 1.32ZM7.18676 9C7.18676 9.9108 6.44329 10.65 5.52724 10.65C4.61119 10.65 3.86773 9.9108 3.86773 9C3.86773 8.0892 4.61119 7.35 5.52724 7.35C6.44329 7.35 7.18676 8.0892 7.18676 9Z"
        fill="#FF2741"
      />
    </svg>
  );
};

export default DiscountIcon;

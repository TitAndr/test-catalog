import { useCallback, useEffect, type RefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  isActive: boolean,
  onOutsideClick: () => void,
) => {
  const handlePointerDown = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onOutsideClick();
      }
    },
    [onOutsideClick, ref],
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handlePointerDown);
    }

    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isActive, handlePointerDown]);
};

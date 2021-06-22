import React, { useCallback, useEffect } from "react";

export default function useClose<T extends HTMLElement>(
  clickEl: React.MutableRefObject<T>,
  targetEl: React.MutableRefObject<T>,
  handler: () => void
): void {
  const closeHandler = useCallback(
    (e: MouseEvent): void => {
      const { target } = e;

      if (
        targetEl.current &&
        clickEl.current &&
        !targetEl.current.contains(target as Node) &&
        !clickEl.current.contains(target as Node)
      ) {
        handler();
      }
    },
    [clickEl, targetEl, handler]
  );

  useEffect(() => {
    window.addEventListener("mousedown", closeHandler);
    return () => window.removeEventListener("mousedown", closeHandler);
  }, [closeHandler]);
}

import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(
  fn: () => void,
  bool: boolean
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    let timer: number;
    const handler = (e: MouseEvent) => {
      const check = !ref.current?.contains(e.target as Node) && bool;
      if (check) {
        timer = setTimeout(() => {
          fn();
        }, 200);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      clearTimeout(timer);
    };
  }, [ref, fn]);

  return ref;
};

export default useClickOutside;

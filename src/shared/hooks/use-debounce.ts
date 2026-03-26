import { useState, useEffect } from "react";

/**
 * Hook para debouncing de valores (ej. busqueda)
 * @param value El valor a debouncing
 * @param delay El tiempo de espera en ms (default 500ms)
 * @returns El valor debounced
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

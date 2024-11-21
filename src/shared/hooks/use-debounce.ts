import { useState, useEffect } from 'react';

interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
}

export function useDebounce<T>(value: T, delay: number, options?: DebounceOptions) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let leadingEdgeRan = false;

    const trailingEdge = () => {
      timeoutId = null;
      if (!leadingEdgeRan) {
        setDebouncedValue(value);
      }
    };

    if (options?.leading === true) {
      leadingEdgeRan = true;
      setDebouncedValue(value);
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(trailingEdge, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [value, delay, options]);

  return debouncedValue;
}

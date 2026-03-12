import { useEffect, useState } from "react";

interface UseLocalStorageStateOptions<T> {
  deserialize?: (raw: string) => T;
  serialize?: (value: T) => string;
}

function defaultDeserialize<T>(raw: string): T {
  return JSON.parse(raw) as T;
}

function defaultSerialize<T>(value: T): string {
  return JSON.stringify(value);
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageStateOptions<T>,
) {
  const deserialize = options?.deserialize ?? defaultDeserialize<T>;
  const serialize = options?.serialize ?? defaultSerialize<T>;

  const setInitialValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) {
        return initialValue;
      }

      return deserialize(raw);
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(setInitialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = serialize(value);
      window.localStorage.setItem(key, raw);
    }
  }, [key, serialize, value]);

  return [value, setValue] as const;
}

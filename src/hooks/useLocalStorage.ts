import { useEffect, useState } from 'react';

/**
 * Hook genérico para sincronizar estado con localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored != null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento lleno o no disponible */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

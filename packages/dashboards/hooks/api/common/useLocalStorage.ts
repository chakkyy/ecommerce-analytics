import { useState } from 'react';

export const useLocalStorage = (keyName: string, defaultValue?: ''): [any, (newValue: any) => void] => {
  const [storedValue, setStoredValue] = useState<any>(() => {
    const value = globalThis.localStorage?.getItem(keyName);

    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return defaultValue;
      }
    }

    if (typeof defaultValue !== 'undefined') {
      globalThis.localStorage?.setItem(keyName, JSON.stringify(defaultValue));
    }

    return defaultValue;
  });

  const setValue = (newValue: any): void => {
    try {
      globalThis.localStorage?.setItem(keyName, JSON.stringify(newValue));
    } catch {
      throw new Error(`Failed to set ${keyName} in local storage.`);
    }

    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

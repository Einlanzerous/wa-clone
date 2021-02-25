import { useEffect, useState } from 'react';

const PREFIX = 'wa-clone-local-';

export function useLocalStorage(key: string, initialValue?: object) {
  const prefixedKey = PREFIX + key;
  
  const [value, setValue] = useState(() => {
    const jsonVal = localStorage.getItem(prefixedKey);
    console.log(jsonVal);

    if (jsonVal != null) return JSON.parse(jsonVal);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value])

  return [value, setValue];
}

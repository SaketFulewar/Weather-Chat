import { useState, useEffect } from 'react';

export const useDataStore = () => {
  const store = window.localStorage;

  const [data, setData] = useState(() => {
    const raw = store.getItem("wc-store");
    return raw ? JSON.parse(raw) : [];
  });

  // Sync data to localStorage whenever it changes
  useEffect(() => {
    store.setItem("wc-store", JSON.stringify(data));
  }, [data]);

  return [data, setData];
};

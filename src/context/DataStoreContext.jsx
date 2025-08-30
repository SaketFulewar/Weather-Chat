import { Children, createContext, useState, useEffect } from "react";

export const LocalChatStore = createContext([]);

export const LocalChatStoreProvider = (props) => {
  const store = window.localStorage;
  const [data, setData] = useState(() => {
    const raw = store.getItem("wc-store");
    return raw ? JSON.parse(raw) : [];
  });

  // Sync data to localStorage whenever it changes
  useEffect(() => {
    console.log(data)
    store.setItem("wc-store", JSON.stringify(data));
  }, [data]);

  return (
    <LocalChatStore.Provider value={{data, setData}}>
        {props.children}
    </LocalChatStore.Provider>
  );
};

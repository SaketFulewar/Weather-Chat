import { Children, useState, useEffect } from "react";
import { LocalChatStore } from "./DataStoreContext";

export const LocalChatStoreProvider = (props) => {
    const store = window.localStorage;
    const [data, setData] = useState(() => {
        const raw = store.getItem("wc-store");
        return raw ? JSON.parse(raw) : [];
    });

    useEffect(() => {
        store.setItem("wc-store", JSON.stringify(data));
    }, [data]);

    return (
        <LocalChatStore.Provider value={{ data, setData }}>
            {props.children}
        </LocalChatStore.Provider>
    );
};
  
"use client"

import React, {Context, createContext, useState} from "react";

export const ItemsContext = createContext({
    items: '',
    setItems: (items: string) => {}
})

export function Providers({ children }: { children: React.ReactNode }){
    const [items, setItems] = useState('[]');
    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    )
}
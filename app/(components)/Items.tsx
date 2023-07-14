"use client"

import {useContext} from "react";
import {ItemsContext} from "@/app/(components)/Providers";
import {Item} from "@/app/(item)/Item";
import {VideoInformation} from "@/app/api/route";

export function Items(){
    const itemsContext = useContext(ItemsContext);
    return (
        <div className="items">
            {JSON.parse(itemsContext.items).map((item: VideoInformation) => (
                <Item key={item.id} video={item}></Item>
            ))}
        </div>
    )
}
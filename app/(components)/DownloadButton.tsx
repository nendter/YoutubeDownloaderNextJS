"use client"

import {useContext, useState} from "react";
import {ItemsContext} from "@/app/(components)/Providers";
import {VideoInformation} from "@/app/api/route";
import Link from "next/link";
import {Loading} from "@/app/(components)/(loading)/Loading";

export function DownloadButton(){
    const itemsContext = useContext(ItemsContext)
    const [loading, setLoading] = useState(false)
    const download = async () => {
        if(loading) return;
        setLoading(true);

        const items: VideoInformation[] = JSON.parse(itemsContext.items);
        if(items.length == 0) return;
        const res = await fetch(`/api/download/multiple?urls=${items.map(i => i.url + ',')}`, {
            method: 'GET',
        })
        const fileBlob = await res.blob();
        const url = URL.createObjectURL(fileBlob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'songs.zip');

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url)

        setLoading(false)
    }

    return (
        <div className="submit">
            <button onClick={download}>
                {loading ? (
                    <Loading></Loading>
                ) : (
                    <p>Download</p>
                )}
            </button>
        </div>
    )
}
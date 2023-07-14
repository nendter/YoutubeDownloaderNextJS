"use client"

import {FieldValues, useForm} from "react-hook-form";
import {VideoInformation} from "@/app/api/route";
import {useContext, useState} from "react";
import {ItemsContext} from "@/app/(components)/Providers";
import {Loading} from "@/app/(components)/(loading)/Loading";

export function AddInput(){

    const { register, handleSubmit } = useForm();
    const itemsContext = useContext(ItemsContext);
    const [loading, setLoading] = useState(false);

    const search = async (data: FieldValues) => {
        if(loading) return;
        setLoading(true)

        const isPlaylist = url.includes('/playlist')

        console.log('sending to: ' + `/api?url=${url}&playlist=${isPlaylist}`)
        const res = await fetch(`/api?url=${url}&playlist=${isPlaylist}`, {
            method: 'GET',
        })
        const body = await res.json();
        if(res.status == 200){
            const newItems = JSON.parse(itemsContext.items)
            body.forEach((b: any) => {
                newItems.push(b)
            })
            itemsContext.setItems(JSON.stringify(newItems));
            setUrl('');
        }

        setLoading(false)
    }

    const [url, setUrl] = useState('');

    return (
        <form className="search" onSubmit={handleSubmit(search)}>
            <input value={url} onChange={(ev) => setUrl(ev.target.value)}  type="text" name="url" placeholder="Add URL..."/>
            <button type="submit">
                {loading ? (
                    <Loading></Loading>
                ):(
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24V232H40c-13.3 0-24 10.7-24 24s10.7 24 24 24H200V440c0 13.3 10.7 24 24 24s24-10.7 24-24V280H408c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z"/></svg>
                )}
            </button>
        </form>
    )
}
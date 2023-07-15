"use client"

import {useContext, useEffect, useState} from "react";
import {ItemsContext} from "@/app/(components)/Providers";
import {VideoInformation} from "@/app/api/route";
import Link from "next/link";
import {Loading} from "@/app/(components)/(loading)/Loading";
import {Progress} from "@/app/lib/progress";
import styles from './DownloadButton.module.css'

export function DownloadButton(){
    const itemsContext = useContext(ItemsContext)
    const [loading, setLoading] = useState(false)
    const [progressId, setProgressId] = useState('');
    const [progress, setProgress] = useState({
        current: 0,
        all: 0
    })

    const download = async () => {
        if(loading) return;
        setLoading(true);

        const localProgressId = generateUUID();
        setProgressId(localProgressId);

        const items: VideoInformation[] = JSON.parse(itemsContext.items);
        if(items.length == 0) return;
        const res = await fetch(`/api/download/multiple?urls=${items.map(i => i.url + ',')}&id=${localProgressId}`, {
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
        setProgressId('')
    }


    useEffect(() => {

        const localProgressId = progressId
        const getProgress = () => {
            if(localProgressId.length == 0 || !loading) return;
            fetch(`/api/download/multiple/progress?id=${localProgressId}`, {
                method: 'GET',
            }).then(async (res) => {
                const progress: Progress = await res.json();
                setProgress(progress)
                if(progress.current != progress.all){
                    setTimeout(() => {
                        getProgress()
                    }, 5000)
                }
            })
        }
        if(progressId.length > 0){
            getProgress()
        }

    }, [progressId, loading])

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    return (
        <div className="submit">
            <button onClick={download}>
                {loading ? (
                    <div className={styles.flex}>
                        <Loading></Loading>
                        <p>{progress.current}/{progress.all}</p>
                    </div>
                ) : (
                    <p>Download</p>
                )}
            </button>
        </div>
    )
}
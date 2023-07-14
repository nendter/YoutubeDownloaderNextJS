"use server"

import {NextRequest, NextResponse} from "next/server";
import {download, getInfo} from "@/app/lib/ytdl";
import {API_URL} from "@/app/lib/env";

export interface VideoInformation{
    url: string,
    id: string,
    title: string,
    thumbnail: string,
    artist: string
}

export async function GET(req: NextRequest){
    const url = req.nextUrl.searchParams.get('url');
    const playlist = req.nextUrl.searchParams.get('playlist');
    if(!url) return NextResponse.json(undefined);

    const res = await fetch(`${API_URL}/info?url=${url}&playlist=${playlist}`, {
        method: 'GET',
    })

    const body = await res.json();
    return NextResponse.json(body);
}
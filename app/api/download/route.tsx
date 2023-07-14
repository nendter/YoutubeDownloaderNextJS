import {NextRequest, NextResponse} from "next/server";
import {download} from "@/app/lib/ytdl";
import {API_URL} from "@/app/lib/env";

export async function GET(req: NextRequest, res: NextResponse){
    const url = req.nextUrl.searchParams.get('url');
    if(!url) return NextResponse.json(undefined);

    const apiRes = await fetch(`${API_URL}/info/download?url=${url}`);
    const receive = await apiRes.blob();

    return new NextResponse(receive, {
        headers: {
            'Content-Disposition': 'attachment; filename="pls.mp3"'
        }
    });
}
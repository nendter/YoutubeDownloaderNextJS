import {NextRequest, NextResponse} from "next/server";
import {createZipFile, ZipFile} from "@/app/lib/zip";
import {API_URL} from "@/app/lib/env";
import {NextApiResponse} from "next";
import {progresses} from "@/app/lib/progress";

export async function GET(req: NextRequest, res: NextResponse) {
    const urls = (req.nextUrl.searchParams.get('urls') ?? '').split(',').filter(s => s.length > 0);
    const files: ZipFile[] = []

    const progress_id = req.nextUrl.searchParams.get('id');
    if(progress_id){
        progresses.set(progress_id, {
            current: 0,
            all: urls.length
        })
    }

    let current = 0
    for(let url of urls){
        if(progress_id) {
            console.log(progresses.get(progress_id))
        }

        const apiRes = await fetch(`${API_URL}/info/download?url=${url}`);
        const receive = await apiRes.blob();
        files.push({
            name: sanitizeFilename(url),
            blob: receive
        });
        current++;

        if(progress_id){
            progresses.get(progress_id)!.current = current;
        }
    }
    const zip = await createZipFile(files)
    return new NextResponse(zip, {
        headers: {
            'Content-Disposition': 'attachment; filename="songs.zip"'
        }
    });
}

function sanitizeFilename(url: string) {
    const sanitizedFilename = url.replace(/[^a-zA-Z0-9_.-]/g, '')
    return sanitizedFilename + '.mp3';
}
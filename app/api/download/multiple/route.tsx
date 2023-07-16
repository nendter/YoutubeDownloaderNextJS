import {NextRequest, NextResponse} from "next/server";
import {createZipFile, ZipFile} from "@/app/lib/zip";
import {API_URL} from "@/app/lib/env";
import {NextApiResponse} from "next";
import {cache, progresses} from "@/app/lib/progress";
import {Simulate} from "react-dom/test-utils";
import progress = Simulate.progress;
import {download} from "@/app/lib/ytdl";

export async function GET(req: NextRequest, res: NextResponse) {
    const urls = (req.nextUrl.searchParams.get('urls') ?? '').split(',').filter(s => s.length > 0);
    const progress_id = req.nextUrl.searchParams.get('id');

    if(!progress_id) return NextResponse.json('No Progress Id')
    downloadAll(progress_id, urls).then(res => {
        console.log('Finished Processing: ' + progress_id)
    }).catch(err => {
        console.log('Error while Processing: ' + progress_id)
        console.log(err)
    })

    return NextResponse.json('Processing...')
}

function sanitizeFilename(url: string) {
    const sanitizedFilename = url.replace(/[^a-zA-Z0-9_.-]/g, '')
    return sanitizedFilename + '.mp3';
}


async function downloadAll(progress_id: string, urls: string[]){

    const files: ZipFile[] = []

    progresses.set(progress_id, {
        current: 0,
        all: urls.length,
        files: []
    })

    let current = 0
    for(let url of urls){

        const apiRes = await fetch(`${API_URL}/info/download?url=${url}`);
        const receive = await apiRes.blob();
        files.push({
            name: sanitizeFilename(url),
            blob: receive
        });
        current++;

        progresses.get(progress_id)!.current = current;
    }

    progresses.get(progress_id)!.files = files

}
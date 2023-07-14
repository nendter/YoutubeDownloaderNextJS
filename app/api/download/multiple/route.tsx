import {NextRequest, NextResponse} from "next/server";
import {createZipFile, ZipFile} from "@/app/lib/zip";

export async function GET(req: NextRequest, res: NextResponse) {
    const urls = (req.nextUrl.searchParams.get('urls') ?? '').split(',').filter(s => s.length > 0);
    const files: ZipFile[] = []
    for(let url of urls){
        const apiRes = await fetch('http://localhost:8000/info/download?url=' + url);
        const receive = await apiRes.blob();
        files.push({
            name: sanitizeFilename(url),
            blob: receive
        });
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
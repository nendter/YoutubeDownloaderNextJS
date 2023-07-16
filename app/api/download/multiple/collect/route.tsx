import {NextRequest, NextResponse} from "next/server";
import {progresses} from "@/app/lib/progress";
import {createZipFile} from "@/app/lib/zip";

export async function GET(req: NextRequest){
    const progress_id = req.nextUrl.searchParams.get('id');
    if(!progress_id) return NextResponse.json('No Progress Id')
    const files = progresses.get(progress_id)?.files
    if(!files) return NextResponse.json('No Files')

    const zip = await createZipFile(files)
    progresses.delete(progress_id)

    return new NextResponse(zip, {
        headers: {
            'Content-Disposition': 'attachment; filename="songs.zip"'
        }
    });
}
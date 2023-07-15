import {NextRequest, NextResponse} from "next/server";
import {createZipFile, ZipFile} from "@/app/lib/zip";
import {API_URL} from "@/app/lib/env";
import {progresses} from "@/app/lib/progress";

export async function GET(req: NextRequest, res: NextResponse) {
    const progress_id = req.nextUrl.searchParams.get('id')
    if(!progress_id) return NextResponse.json({
        'current': 0,
        'all': 1
    })
    const progress = progresses.get(progress_id)
    if(!progress) return NextResponse.json({
        'current': 0,
        'all': 1
    })
    return NextResponse.json({
        'current': progress.current,
        'all': progress.all
    })
}
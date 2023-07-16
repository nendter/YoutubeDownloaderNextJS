import {ZipFile} from "@/app/lib/zip";

export interface Progress{
    current: number
    all: number
    files: ZipFile[]
}

export const progresses: Map<string, Progress> = new Map();

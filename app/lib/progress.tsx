import {ZipFile} from "@/app/lib/zip";
import {LRUCache} from "lru-cache";

export interface Progress{
    current: number
    all: number
    files: ZipFile[]
}

console.log('REINITIALIZE PROGRESSES')
export const progresses: Map<string, Progress> = new Map();

export const cache = new LRUCache({
    ttl: 1000 * 60 * 60,
    ttlAutopurge: false
})

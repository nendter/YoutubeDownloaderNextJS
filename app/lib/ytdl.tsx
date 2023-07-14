"use server"

import * as fs from "fs";
import {VideoInformation} from "@/app/api/route";
import {NextRequest, NextResponse} from "next/server";
import {Readable} from "stream";

const ytdl = require('ytdl-core');

const items: Map<string, any> = new Map();

export async function getInfo(url: string){
    const info = await ytdl.getBasicInfo(url);
    items.set(url, info);
    return info;
}
export async function download(url: string){
    console.log(url);
    let info = items.get(url);
    if(!info){
        info = await getInfo(url);
    }

    ytdl(url).pipe(fs.createWriteStream('./cache/test2.mp3'));

    // // let audioFormats = info.formats.filter((f: any) => f.mimeType.startsWith('audio')).sort((a: any, b: any) => {
    // //     return ((a.averageBitrate < b.averageBitrate) ? 1:-1)
    // // });
    // // if(audioFormats.length == 0){
    // //     return;
    // // }
    // console.log(info.formats)
    // // let chosen = ytdl.chooseFormat(info.formats, {
    // //     quality: 'highest'
    // // });
    // // const format = info.formats[0]
    // // console.log(chosen);
    // ytdl(url, { filter: (format: any) => format.container === 'mp4' }).pipe(fs.createWriteStream('./cache/file.mp4'))
    // await handleDownload(res)
}

async function handleDownload(readableStream: Readable) {

    const filePath = './cache/file.mp4';

    // Write the readable stream data to the file
    const writeStream = fs.createWriteStream(filePath);
    readableStream.pipe(writeStream);

    // Handle the completion of the write stream
    writeStream.on('finish', () => {
        console.log('finish writing')
        // // Read the file into a JavaScript File object
        // fs.readFile(filePath, (err, data) => {
        //     if (err) {
        //         console.error('Error reading file:', err);
        //         return;
        //     }
        //
        //     // Create a JavaScript File object
        //     const file = new File([data], 'file.mp3', { type: 'audio/mp3' });
        //
        //     // Perform any desired operations with the File object
        //     console.log('File:', file);
        //
        //     // Delete the file after processing
        //     // fs.unlinkSync(filePath);
        //
        // });
    });
}
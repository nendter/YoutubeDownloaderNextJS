import JSZip from "jszip";

const fs = require('fs');
const archiver = require('archiver');

export interface ZipFile{
    name: string,
    blob: Blob
}

export async function createZipFile(files: ZipFile[]) {
    const zip = new JSZip();

    for (const file of files) {
        const buffer = await blobToArrayBuffer(file.blob);
        zip.file(file.name, buffer);
    }

    return zip.generateAsync({ type: 'blob' });
}

async function blobToArrayBuffer(blob: Blob) {
    const response = await fetch(URL.createObjectURL(blob));
    return await response.arrayBuffer();
}

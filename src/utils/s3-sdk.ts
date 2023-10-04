import AWS from 'aws-sdk'
import fetch from 'node-fetch';

export const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
})

const blobToBuffer = (blob: Blob): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result instanceof ArrayBuffer) {
                const buffer = Buffer.from(reader.result);
                resolve(buffer);
            } else {
                reject(new Error('Failed to convert Blob to Buffer'));
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
};

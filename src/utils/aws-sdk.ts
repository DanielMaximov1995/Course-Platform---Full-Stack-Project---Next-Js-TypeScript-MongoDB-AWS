'use server'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
})

export const uploadFileToFolderS3 = async (file : any , folder : any) => {
    try {
        console.log('on')
        const params : AWS.S3.PutObjectRequest = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!!,
            Key: `${folder}/${file.name}`,
            Body: file,
        }

        const uploadFile = await s3.upload(params).promise()

        return uploadFile.Location
    } catch (err) {
        console.error(err)
        throw err
    }
}

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

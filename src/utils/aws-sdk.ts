import AWS from 'aws-sdk'
import { PassThrough } from 'stream';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
})

export const uploadFileToFolderS3 = async (file : string , folder : string , fileName : string) => {
    try {

        const params : AWS.S3.PutObjectRequest = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!!,
            Key: `${folder}/${fileName}`,
            Body: file,
        }

        const uploadFile = await s3.upload(params).promise()

        return uploadFile.Location
    } catch (err) {
        console.error(err)
        throw err
    }
}
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.CloudinaryApiKey,
    api_secret: process.env.CloudinaryApiSecret,
});

interface UploadedFile {
    fileName: string;
    url: string;
}

export const uploadFileToFolder = async (file: UploadedFile, folder: string): Promise<string> => {
    try {
        const folderExistsResult = await (cloudinary.v2.api.root_folders as any)({ resource_type: 'auto' });
        const productsFolder = folderExistsResult.folders.find((f: any) => f.name === folder); 

        const uploadResult = await cloudinary.v2.uploader.upload(file.url, {
            folder: productsFolder?.path,
            resource_type: 'auto',
            public_id: file.fileName,
        });

        return uploadResult.url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading file');
    }
};
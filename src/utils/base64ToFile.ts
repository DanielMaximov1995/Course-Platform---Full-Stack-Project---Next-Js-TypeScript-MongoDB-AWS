const url = 'blob:http://localhost:3000/139ce844-9d04-4f3b-ab64-b00aa230b92a'
const fileName = 'wyPLAYLIST_cd1b32e3.mp4'
const mimeType = 'video/mp4'

export const base64ToFile = async (url: any, fileName: string, mimeType: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();

        // Create a File object from the blob data
        const file = new File([blob], fileName, { type: mimeType });

        return file;
    } catch (error) {
        console.error("Error converting Base64 to File:", error);
        return null;
    }
}
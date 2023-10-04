export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to read file as base64.'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const fileToUint8Array = (selectedFile: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result instanceof ArrayBuffer) {
                    const uint8Array = new Uint8Array(reader.result);
                    // Create an object with the file data
                    const fileToServer = {
                        name: selectedFile.name,
                        type: selectedFile.type,
                        data: uint8Array,
                    };
                    // Resolve the promise with the fileToServer object
                    resolve(fileToServer);
                } else {
                    // Reject the promise if the result is not an ArrayBuffer
                    reject(new Error('Failed to read file as ArrayBuffer'));
                }
            };
            reader.onerror = (error) => {
                // Reject the promise in case of an error
                reject(error);
            };
            reader.readAsArrayBuffer(selectedFile);
        } catch (error) {
            // Reject the promise if there's an exception
            reject(error);
        }
    });
};

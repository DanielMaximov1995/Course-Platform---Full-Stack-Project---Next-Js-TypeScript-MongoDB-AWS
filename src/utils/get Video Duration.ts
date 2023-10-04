const formatVideoDuration = (durationInSeconds: number): number => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    // Use String.padStart to ensure that minutes and seconds have two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return Number(`${formattedMinutes}.${formattedSeconds}`);
};

export const getVideoDuration = (file: string , typeVideo : boolean): Promise<number> => {
    return new Promise((resolve, reject) => {
        if(!typeVideo) {
            resolve(0)
        } else {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = file;

            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(file);
                const duration = video.duration;
                let time = formatVideoDuration(duration)
                resolve(time);
            };

            video.onerror = (err) => {
                console.log(err)
                reject(new Error('Failed to load video metadata'));
            };
        }
    });
};
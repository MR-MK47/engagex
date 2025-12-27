const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_URL = "https://www.googleapis.com/youtube/v3";

export interface VideoMetadata {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    channelTitle: string;
    duration: string; // ISO 8601
}

export const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

export const fetchVideoMetadata = async (videoId: string): Promise<VideoMetadata | null> => {
    if (!API_KEY) {
        console.error("YouTube API Key is missing");
        throw new Error("API Key missing");
    }

    try {
        const response = await fetch(
            `${API_URL}/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error("YouTube API Error");
        }

        const data = await response.json();

        if (data.items.length === 0) return null;

        const item = data.items[0];
        const snippet = item.snippet;

        return {
            id: videoId,
            title: snippet.title,
            description: snippet.description,
            thumbnailUrl: snippet.thumbnails.high?.url || snippet.thumbnails.medium?.url,
            channelTitle: snippet.channelTitle,
            duration: item.contentDetails.duration,
        };
    } catch (error) {
        console.error("Error fetching video metadata:", error);
        return null;
    }
};

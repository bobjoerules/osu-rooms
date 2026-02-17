const STORAGE_URL = 'https://firebasestorage.googleapis.com/v0/b/osu-room-rates.firebasestorage.app/o';

export const firebaseImage = (path: string): string => {
    const encodedPath = encodeURIComponent(path);
    return `${STORAGE_URL}/${encodedPath}?alt=media`;
};

export interface Room {
    id: string;
    images: any[];
    floor: string;
    capacity: string;
    roomType: string;
    searchAliases?: string[];
    imageUpdateImportant?: boolean;
}

export interface Building {
    id: string;
    name: string;
    images?: any[];
    rooms: Room[];
    avgRating?: number;
    count?: number;
}
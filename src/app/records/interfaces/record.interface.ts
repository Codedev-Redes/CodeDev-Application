export interface VideoResponse{
    _id: string;
    length: string;
    chunkSize: string;
    filename: string;
    uploadDate: string;
    duration?: number | 0;
    size?: number | string | 0;
}
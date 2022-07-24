/// <reference types="multer" />
export declare class FileService {
    uploadFile(files: Express.Multer.File[]): Promise<string[]>;
    removeFile(dto: {
        files: string[];
    }): Promise<{
        message: string;
    }>;
}

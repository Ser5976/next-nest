/// <reference types="multer" />
export declare class FileService {
    uploadFile(files: Express.Multer.File[]): Promise<string[]>;
    removeFile(dto: {
        files: string[] | string;
    }): Promise<{
        message: string;
    }>;
}

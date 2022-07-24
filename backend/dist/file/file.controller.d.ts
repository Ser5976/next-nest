/// <reference types="multer" />
import { FileService } from './file.service';
export declare class FileController {
    private readonly FileService;
    constructor(FileService: FileService);
    uploadFile(files: Express.Multer.File[]): Promise<string[]>;
    removeFile(dto: {
        files: string[];
    }): Promise<{
        message: string;
    }>;
}

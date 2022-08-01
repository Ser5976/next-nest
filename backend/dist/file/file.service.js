"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const app_root_path_1 = require("app-root-path");
const fs_extra_1 = require("fs-extra");
const uuid = require("uuid");
let FileService = class FileService {
    async uploadFile(files) {
        const uploadFolder = `${app_root_path_1.path}/uploads`;
        await (0, fs_extra_1.ensureDir)(uploadFolder);
        const filesUrls = await Promise.all(files.map(async (file) => {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = uuid.v4() + '.' + fileExtension;
            await (0, fs_extra_1.writeFile)(`${uploadFolder}/${fileName}`, file.buffer);
            return fileName;
        }));
        return filesUrls;
    }
    async removeFile(dto) {
        const uploadFolder = `${app_root_path_1.path}/uploads`;
        await Promise.all(dto.files.map(async (file) => {
            await (0, fs_extra_1.remove)(`${uploadFolder}/${file}`);
        }));
        return { message: 'файл удалён' };
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map
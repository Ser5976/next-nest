"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PosterTypeController = void 0;
const poster_type_service_1 = require("./poster-type.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const poster_type_dto_1 = require("./dto/poster-type.dto");
const udatePoster_dto_1 = require("./dto/udatePoster.dto");
let PosterTypeController = class PosterTypeController {
    constructor(PosterTypeService) {
        this.PosterTypeService = PosterTypeService;
    }
    async createPoster(dto) {
        return this.PosterTypeService.createPoster(dto);
    }
    async getPosters() {
        return this.PosterTypeService.getPosters();
    }
    async getPoster(typeId) {
        return this.PosterTypeService.getPoster(typeId);
    }
    async updatePoster(dto) {
        return this.PosterTypeService.updatePoster(dto);
    }
    async deletePicture(typeId) {
        return this.PosterTypeService.deletePoster(typeId);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [poster_type_dto_1.PosterTypeDto]),
    __metadata("design:returntype", Promise)
], PosterTypeController.prototype, "createPoster", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorators_1.Auth)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PosterTypeController.prototype, "getPosters", null);
__decorate([
    (0, common_1.Get)(':typeId'),
    __param(0, (0, common_1.Param)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PosterTypeController.prototype, "getPoster", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [udatePoster_dto_1.UpdatePosterDto]),
    __metadata("design:returntype", Promise)
], PosterTypeController.prototype, "updatePoster", null);
__decorate([
    (0, common_1.Delete)(':typeId'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PosterTypeController.prototype, "deletePicture", null);
PosterTypeController = __decorate([
    (0, common_1.Controller)('poster-type'),
    __metadata("design:paramtypes", [poster_type_service_1.PosterTypeService])
], PosterTypeController);
exports.PosterTypeController = PosterTypeController;
//# sourceMappingURL=poster-type.controller.js.map
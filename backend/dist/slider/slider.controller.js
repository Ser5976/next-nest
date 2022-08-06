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
exports.SliderController = void 0;
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const pictureDelete_dto_1 = require("./dto/pictureDelete.dto");
const slider_dto_1 = require("./dto/slider.dto");
const slider_service_1 = require("./slider.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
let SliderController = class SliderController {
    constructor(SliderService) {
        this.SliderService = SliderService;
    }
    async createSlider(dto) {
        return this.SliderService.createSlider(dto);
    }
    async getSlider() {
        return this.SliderService.getSlider();
    }
    async deletePicture(id, dto) {
        return this.SliderService.deletePicture(id, dto);
    }
    async addPicture(id, dto) {
        return this.SliderService.addPicture(id, dto);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [slider_dto_1.SliderDto]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "createSlider", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "getSlider", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('delete/:id'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pictureDelete_dto_1.PictureDeleteDto]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "deletePicture", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)('add/:id'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, slider_dto_1.SliderDto]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "addPicture", null);
SliderController = __decorate([
    (0, common_1.Controller)('slider'),
    __metadata("design:paramtypes", [slider_service_1.SliderService])
], SliderController);
exports.SliderController = SliderController;
//# sourceMappingURL=slider.controller.js.map
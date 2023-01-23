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
exports.SliderService = void 0;
const slider_model_1 = require("./slider.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let SliderService = class SliderService {
    constructor(SliderModel) {
        this.SliderModel = SliderModel;
    }
    async addPicture(dto) {
        const picture = await this.SliderModel.create(dto);
        if (!picture)
            throw new common_1.NotFoundException('Что то пошло не так,коллекция не создана');
        return picture;
    }
    async getSlider() {
        const slider = await this.SliderModel.find();
        if (!slider)
            throw new common_1.NotFoundException('Что то пошло не так');
        return slider;
    }
    async deletePicture(id) {
        const deleteFile = await this.SliderModel.findByIdAndDelete(id);
        return deleteFile;
    }
};
SliderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(slider_model_1.SliderModel)),
    __metadata("design:paramtypes", [Object])
], SliderService);
exports.SliderService = SliderService;
//# sourceMappingURL=slider.service.js.map
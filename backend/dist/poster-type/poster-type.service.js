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
exports.PosterTypeService = void 0;
const poster_type_model_1 = require("./poster-type.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let PosterTypeService = class PosterTypeService {
    constructor(PosterTypeModel) {
        this.PosterTypeModel = PosterTypeModel;
    }
    async createPoster(dto) {
        console.log(dto);
        const check = await this.PosterTypeModel.findOne({ typeId: dto.typeId });
        if (check)
            throw new common_1.BadRequestException('Постер у этого типа товаров  уже есть');
        const poster = await this.PosterTypeModel.create(dto);
        if (!poster)
            throw new common_1.NotFoundException('Что то пошло не так,коллекция не создана');
        return poster;
    }
    async getPosters() {
        const posters = await this.PosterTypeModel.find().populate('typeId');
        if (!posters)
            throw new common_1.NotFoundException('Что то пошло не так');
        return posters;
    }
    async getPoster(typeId) {
        const posterType = await this.PosterTypeModel.findOne({ typeId: typeId });
        if (!posterType)
            throw new common_1.NotFoundException('Что то пошло не так');
        return posterType;
    }
    async updatePoster(dto) {
        const posterUpdate = await this.PosterTypeModel.updateOne({ _id: dto.posterId }, { picture: dto.picture });
        if (!posterUpdate)
            throw new common_1.NotFoundException('Что то пошло не так');
        return { message: 'Постер изменён' };
    }
    async deletePoster(posterId) {
        await this.PosterTypeModel.findOneAndDelete({ _id: posterId });
        return { message: 'Постер удален' };
    }
};
PosterTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(poster_type_model_1.PosterTypeModel)),
    __metadata("design:paramtypes", [Object])
], PosterTypeService);
exports.PosterTypeService = PosterTypeService;
//# sourceMappingURL=poster-type.service.js.map
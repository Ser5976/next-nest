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
exports.BrandService = void 0;
const brand_model_1 = require("./brand.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let BrandService = class BrandService {
    constructor(BrandModel) {
        this.BrandModel = BrandModel;
    }
    async createBrand(dto) {
        const brand = await this.BrandModel.create(dto);
        if (!brand)
            throw new common_1.NotFoundException('Брэнд не создан');
        return brand;
    }
    async getBrands(searchBrand) {
        let options = {};
        if (searchBrand) {
            options = {
                $or: [
                    {
                        name: new RegExp(searchBrand, 'i'),
                    },
                ],
            };
        }
        const brands = await this.BrandModel.find(options);
        return brands;
    }
    async updateBarnd(id, dto) {
        const updateBrand = await this.BrandModel.findByIdAndUpdate(id, { logo: dto.logo }, { new: true });
        if (!updateBrand)
            throw new common_1.NotFoundException('Обнавление не произошло');
        return updateBrand;
    }
    async removeBrand(id) {
        const deletedBrand = await this.BrandModel.findByIdAndDelete(id);
        if (!deletedBrand)
            throw new common_1.NotFoundException('Брэнд не удалён');
        return { message: 'брэнд удалён' };
    }
};
BrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(brand_model_1.BrandModel)),
    __metadata("design:paramtypes", [Object])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=brand.service.js.map
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
const category_product_model_1 = require("./../category-product/category-product.model");
const product_type_model_1 = require("./../product-type/product-type.model");
const product_model_1 = require("../product/product.model");
const brand_model_1 = require("./brand.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let BrandService = class BrandService {
    constructor(BrandModel, ProductModel, ProductTypeModel, CategoryProductModel) {
        this.BrandModel = BrandModel;
        this.ProductModel = ProductModel;
        this.ProductTypeModel = ProductTypeModel;
        this.CategoryProductModel = CategoryProductModel;
    }
    async createBrand(dto) {
        const brand = await this.BrandModel.create(dto);
        if (!brand)
            throw new common_1.NotFoundException('Брэнд не создан');
        return brand;
    }
    async getBrands(dto) {
        let options = {};
        if (dto.name) {
            options = {
                $or: [
                    {
                        name: new RegExp(dto.name, 'i'),
                    },
                ],
            };
        }
        const brands = await this.BrandModel.find(options);
        if (!brands)
            throw new common_1.NotFoundException('Брэнды не получены');
        console.log('сервак брэнд', brands);
        return brands;
    }
    async removeBrand(id) {
        const product = await this.ProductModel.findOne({ brandId: id });
        if (product)
            throw new common_1.BadRequestException('Брэнд не удалён,используется в товарах');
        const type = await this.ProductTypeModel.updateMany({}, { $pull: { brand: id } });
        const category = await this.CategoryProductModel.updateMany({}, { $pull: { brand: id } });
        const deletedBrand = await this.BrandModel.findByIdAndDelete(id);
        if (!deletedBrand)
            throw new common_1.NotFoundException('Брэнд не удалён');
        return deletedBrand;
    }
};
BrandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(brand_model_1.BrandModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(product_model_1.ProductModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(product_type_model_1.ProductTypeModel)),
    __param(3, (0, nestjs_typegoose_1.InjectModel)(category_product_model_1.CategoryProductModel)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=brand.service.js.map
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
exports.ProductTypeService = void 0;
const poster_type_model_1 = require("./../poster-type/poster-type.model");
const category_product_model_1 = require("./../category-product/category-product.model");
const product_model_1 = require("../product/product.model");
const product_type_model_1 = require("./product-type.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let ProductTypeService = class ProductTypeService {
    constructor(ProductTypeModel, ProductModel, CategoryProductModel, PosterTypeModel) {
        this.ProductTypeModel = ProductTypeModel;
        this.ProductModel = ProductModel;
        this.CategoryProductModel = CategoryProductModel;
        this.PosterTypeModel = PosterTypeModel;
    }
    async createProductType(dto) {
        const candidate = await this.ProductTypeModel.findOne({ name: dto.name });
        if (candidate)
            throw new common_1.BadRequestException('Такой тип уже существует');
        const productType = await this.ProductTypeModel.create(dto);
        if (!productType)
            throw new common_1.NotFoundException('Тип продукта не создан');
        return productType;
    }
    async getProductType(dto) {
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
        const productsTypes = await this.ProductTypeModel.find(options)
            .populate('brand')
            .exec();
        if (!productsTypes)
            throw new common_1.NotFoundException('Типы не получены');
        return productsTypes;
    }
    async removeProductType(id) {
        const product = await this.ProductModel.findOne({ typeId: id });
        if (product)
            throw new common_1.BadRequestException('Тип не удалён,использутся в товарах');
        const poster = await this.PosterTypeModel.findOne({ typeId: id });
        if (poster)
            throw new common_1.BadRequestException('Тип не удалён,удалите постер с этим типом');
        await this.CategoryProductModel.updateMany({}, { $pull: { productType: id } });
        const removeProductType = await this.ProductTypeModel.findByIdAndDelete(id).exec();
        if (!removeProductType)
            throw new common_1.NotFoundException('Тип продукта не удалён');
        return removeProductType;
    }
};
ProductTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(product_type_model_1.ProductTypeModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(product_model_1.ProductModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(category_product_model_1.CategoryProductModel)),
    __param(3, (0, nestjs_typegoose_1.InjectModel)(poster_type_model_1.PosterTypeModel)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ProductTypeService);
exports.ProductTypeService = ProductTypeService;
//# sourceMappingURL=product-type.service.js.map
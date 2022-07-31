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
exports.CategoryProductService = void 0;
const category_product_model_1 = require("./category-product.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let CategoryProductService = class CategoryProductService {
    constructor(CategoryProductModel) {
        this.CategoryProductModel = CategoryProductModel;
    }
    async createCategoryProduct(dto) {
        const categoryProduct = await this.CategoryProductModel.create(dto);
        if (!categoryProduct)
            throw new common_1.NotFoundException('Категория продукта не создан');
        return categoryProduct;
    }
    async getCategoryProduct() {
        const categoryProduct = await this.CategoryProductModel.find()
            .populate('productType brand')
            .exec();
        if (!categoryProduct)
            throw new common_1.NotFoundException('Категории не получены');
        return categoryProduct;
    }
    async removeProductType(id) {
        const removeCategoryProduct = await this.CategoryProductModel.findByIdAndDelete(id).exec();
        if (!removeCategoryProduct)
            throw new common_1.NotFoundException('Категория продукта не удалёна');
        return { message: 'Категория продукта удалена' };
    }
};
CategoryProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(category_product_model_1.CategoryProductModel)),
    __metadata("design:paramtypes", [Object])
], CategoryProductService);
exports.CategoryProductService = CategoryProductService;
//# sourceMappingURL=category-product.service.js.map
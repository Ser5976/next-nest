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
exports.ProductService = void 0;
const category_product_model_1 = require("./../category-product/category-product.model");
const product_type_model_1 = require("./../product-type/product-type.model");
const product_model_1 = require("./product.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ProductService = class ProductService {
    constructor(ProductModel, ProductTypeModel, CategoryProductModel) {
        this.ProductModel = ProductModel;
        this.ProductTypeModel = ProductTypeModel;
        this.CategoryProductModel = CategoryProductModel;
    }
    async create(dto) {
        const typeProduct = await this.ProductTypeModel.findById(dto.typeId);
        const checkBrand = typeProduct.brand.includes(new mongoose_1.Types.ObjectId(dto.brandId));
        if (!checkBrand) {
            await this.ProductTypeModel.updateOne({ _id: dto.typeId }, {
                $push: { brand: dto.brandId },
            });
        }
        const categoryProduct = await this.CategoryProductModel.findById(dto.categoryId);
        const checkType = categoryProduct.productType.includes(new mongoose_1.Types.ObjectId(dto.typeId));
        if (!checkType) {
            await this.CategoryProductModel.updateOne({ _id: dto.categoryId }, {
                $push: { productType: dto.typeId },
            });
        }
        const checkBrandCategory = categoryProduct.brand.includes(new mongoose_1.Types.ObjectId(dto.brandId));
        if (!checkBrandCategory) {
            await this.CategoryProductModel.updateOne({ _id: dto.categoryId }, {
                $push: { brand: dto.brandId },
            });
        }
        const product = await this.ProductModel.create(dto);
        if (!product)
            throw new common_1.NotFoundException('Товар не создан');
        return product;
    }
    async getFilteredProducts(dto) {
        const { minPrice, maxPrice, page = 1, limit = 3 } = dto;
        console.log('Dto:', dto);
        let offset = Number(page) * Number(limit) - Number(limit);
        let opition = {};
        if (minPrice && maxPrice) {
            const price = {
                $gte: Number(minPrice),
                $lte: Number(maxPrice),
            };
            delete dto.minPrice;
            delete dto.maxPrice;
            delete dto.limit;
            opition = Object.assign(Object.assign({}, dto), { price });
        }
        else {
            opition = dto;
        }
        console.log('Option:', opition);
        const allProduct = await this.ProductModel.find(opition)
            .sort({ createdAt: 'desc' })
            .skip(offset)
            .limit(Number(limit));
        const count = await this.ProductModel.find(opition).count();
        const pageQty = Math.ceil(count / limit);
        return { allProduct, count, pageQty };
    }
    async byIdProduct(id) {
        const product = await this.ProductModel.findById(id).exec();
        product.coundOpened = product.coundOpened + 1;
        await product.save();
        if (!product)
            throw new common_1.NotFoundException('Такого товара не существует!');
        return product;
    }
    async textSearch(dto) {
        const foundProduct = await this.ProductModel.find({
            $text: { $search: dto.text, $caseSensitive: false },
        }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .exec();
        return foundProduct;
    }
    async getPopularProduct() {
        const popularProduct = await this.ProductModel.find({
            coundOpened: { $gt: 0 },
        })
            .sort({ coundOpened: -1 })
            .limit(6)
            .exec();
        if (!popularProduct)
            throw new common_1.NotFoundException('товары не получены');
        return popularProduct;
    }
    async getLatestProduct() {
        const latestProduct = await this.ProductModel.find()
            .sort({ createdAt: 'desc' })
            .limit(6)
            .exec();
        if (!latestProduct)
            throw new common_1.NotFoundException('товары не получены');
        return latestProduct;
    }
    async updateProduct(id, dto) {
        const newProduct = await this.ProductModel.findByIdAndUpdate(id, dto, {
            new: true,
        }).exec();
        if (!newProduct)
            throw new common_1.NotFoundException('Обнавление не произошло');
        return newProduct;
    }
    async deleteProduct(id) {
        const deleteProduct = await this.ProductModel.findByIdAndDelete(id).exec();
        if (!deleteProduct)
            throw new common_1.NotFoundException('Такого пользователя не существует');
        return { message: 'Пользователь удалён' };
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(product_model_1.ProductModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(product_type_model_1.ProductTypeModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(category_product_model_1.CategoryProductModel)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map
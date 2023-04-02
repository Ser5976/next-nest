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
const user_model_1 = require("./../user/user.model");
const cart_model_1 = require("./../cart/cart.model");
const category_product_model_1 = require("./../category-product/category-product.model");
const product_type_model_1 = require("./../product-type/product-type.model");
const product_model_1 = require("./product.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ProductService = class ProductService {
    constructor(ProductModel, ProductTypeModel, CategoryProductModel, CartModel, UserModel) {
        this.ProductModel = ProductModel;
        this.ProductTypeModel = ProductTypeModel;
        this.CategoryProductModel = CategoryProductModel;
        this.CartModel = CartModel;
        this.UserModel = UserModel;
    }
    async create(dto) {
        const typeProduct = await this.ProductTypeModel.findById(dto.typeId);
        const checkBrand = typeProduct.brand.includes(new mongoose_1.Types.ObjectId(dto.brandId));
        if (!checkBrand) {
            await this.ProductTypeModel.updateOne({ _id: dto.typeId }, {
                $push: { brand: dto.brandId },
            });
        }
        const characteristicType = typeProduct.characteristic;
        if (characteristicType.length === 0) {
            dto.characteristic.forEach((char) => {
                characteristicType.push({
                    title: char.title,
                    property: [char.property],
                });
            });
        }
        else {
            characteristicType.forEach((newChar, index) => {
                dto.characteristic.forEach((char) => {
                    if (newChar.title === char.title) {
                        if (!newChar.property.includes(char.property)) {
                            characteristicType[index].property.push(char.property);
                        }
                    }
                });
            });
        }
        dto.characteristic.forEach((char) => {
            const check = characteristicType.find((newChar) => {
                return char.title === newChar.title;
            });
            console.log('check:', check);
            if (!check) {
                characteristicType.push({
                    title: char.title,
                    property: [char.property],
                });
            }
        });
        await this.ProductTypeModel.updateOne({ _id: dto.typeId }, {
            characteristic: characteristicType,
        });
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
    async getProducts(dto) {
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
        const products = await this.ProductModel.find(options).exec();
        if (!products)
            throw new common_1.NotFoundException('товары не получены');
        const quantity = await this.ProductModel.find().count().exec();
        return { products, quantity };
    }
    async getFilteredProducts(dto) {
        const { typeId, brandId, minPrice, maxPrice, page = 1, limit = 3 } = dto;
        const option = { $and: [{ typeId }] };
        const copyDto = Object.assign({}, dto);
        delete copyDto.typeId;
        delete copyDto.page;
        delete copyDto.limit;
        let offset = Number(page) * Number(limit) - Number(limit);
        if (brandId) {
            const brand = typeof brandId === 'object' ? { $in: [...brandId] } : brandId;
            delete copyDto.brandId;
            option.$and.push({ brandId: brand });
        }
        if (minPrice && maxPrice) {
            const price = {
                $gte: Number(minPrice),
                $lte: Number(maxPrice),
            };
            delete copyDto.maxPrice;
            delete copyDto.minPrice;
            option.$and.push({ price });
        }
        if (Object.keys(copyDto).length !== 0) {
            const arrProperty = [];
            const arrCopyDto = [];
            for (const key in copyDto) {
                arrCopyDto.push({ [key]: copyDto[key] });
            }
            arrCopyDto.forEach((item) => {
                const key = Object.keys(item);
                if (typeof item[key[0]] === 'object') {
                    arrProperty.push({
                        'characteristic.property': { $in: item[key[0]] },
                    });
                }
                else {
                    arrProperty.push({
                        'characteristic.property': item[key[0]],
                    });
                }
            });
            option.$and.push(...arrProperty);
        }
        console.log('Option:', option);
        const filteredProducts = await this.ProductModel.find(option)
            .sort({ createdAt: 'desc' })
            .skip(offset)
            .limit(Number(limit));
        const count = await this.ProductModel.find(option).count();
        const pageQty = Math.ceil(count / limit);
        return { filteredProducts, count, pageQty };
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
    async getPopularProducts() {
        const popularProducts = await this.ProductModel.find({
            coundOpened: { $gt: 0 },
        })
            .sort({ coundOpened: -1 })
            .limit(6)
            .exec();
        if (!popularProducts)
            throw new common_1.NotFoundException('товары не получены');
        return popularProducts;
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
        const typeProduct = await this.ProductTypeModel.findById(dto.typeId);
        const characteristicType = typeProduct.characteristic;
        if (characteristicType.length === 0) {
            dto.characteristic.forEach((char) => {
                characteristicType.push({
                    title: char.title,
                    property: [char.property],
                });
            });
        }
        else {
            characteristicType.forEach((newChar, index) => {
                dto.characteristic.forEach((char) => {
                    if (newChar.title === char.title) {
                        if (!newChar.property.includes(char.property)) {
                            characteristicType[index].property.push(char.property);
                        }
                    }
                });
            });
        }
        dto.characteristic.forEach((char) => {
            const check = characteristicType.find((newChar) => {
                return char.title === newChar.title;
            });
            if (!check) {
                characteristicType.push({
                    title: char.title,
                    property: [char.property],
                });
            }
        });
        await this.ProductTypeModel.updateOne({ _id: dto.typeId }, {
            characteristic: characteristicType,
        });
        const newProduct = await this.ProductModel.findByIdAndUpdate(id, dto, {
            new: true,
        }).exec();
        if (!newProduct)
            throw new common_1.NotFoundException('Обнавление не произошло');
        return newProduct;
    }
    async deleteProduct(id) {
        const deleteProduct = await this.ProductModel.findByIdAndDelete(id).exec();
        if (!deleteProduct) {
            throw new common_1.NotFoundException('Такого товара не существует');
        }
        const deleteCart = await this.CartModel.find({ productId: id });
        deleteCart.forEach(async (item) => {
            await this.UserModel.updateMany({}, { $pull: { cart: item._id } });
        });
        await this.CartModel.deleteMany({
            productId: id,
        });
        return { message: 'Пользователь удалён' };
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(product_model_1.ProductModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(product_type_model_1.ProductTypeModel)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(category_product_model_1.CategoryProductModel)),
    __param(3, (0, nestjs_typegoose_1.InjectModel)(cart_model_1.CartModel)),
    __param(4, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map
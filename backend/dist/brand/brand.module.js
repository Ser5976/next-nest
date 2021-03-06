"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModule = void 0;
const category_product_model_1 = require("./../category-product/category-product.model");
const product_type_model_1 = require("./../product-type/product-type.model");
const product_model_1 = require("../product/product.model");
const brand_model_1 = require("./brand.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const brand_controller_1 = require("./brand.controller");
const brand_service_1 = require("./brand.service");
let BrandModule = class BrandModule {
};
BrandModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: brand_model_1.BrandModel,
                    schemaOptions: {
                        collection: 'Brand',
                    },
                },
            ]),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: product_model_1.ProductModel,
                    schemaOptions: {
                        collection: 'Product',
                    },
                },
            ]),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: product_type_model_1.ProductTypeModel,
                    schemaOptions: {
                        collection: 'ProductType',
                    },
                },
            ]),
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: category_product_model_1.CategoryProductModel,
                    schemaOptions: {
                        collection: 'CatecoryProduct',
                    },
                },
            ]),
        ],
        controllers: [brand_controller_1.BrandController],
        providers: [brand_service_1.BrandService],
    })
], BrandModule);
exports.BrandModule = BrandModule;
//# sourceMappingURL=brand.module.js.map
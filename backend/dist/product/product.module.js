"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const category_product_model_1 = require("./../category-product/category-product.model");
const product_type_model_1 = require("./../product-type/product-type.model");
const product_model_1 = require("./product.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map
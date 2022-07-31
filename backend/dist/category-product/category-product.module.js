"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryProductModule = void 0;
const product_model_1 = require("../product/product.model");
const category_product_model_1 = require("./category-product.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const category_product_controller_1 = require("./category-product.controller");
const category_product_service_1 = require("./category-product.service");
let CategoryProductModule = class CategoryProductModule {
};
CategoryProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forFeature([
                {
                    typegooseClass: category_product_model_1.CategoryProductModel,
                    schemaOptions: {
                        collection: 'CatecoryProduct',
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
        ],
        controllers: [category_product_controller_1.CategoryProductController],
        providers: [category_product_service_1.CategoryProductService],
    })
], CategoryProductModule);
exports.CategoryProductModule = CategoryProductModule;
//# sourceMappingURL=category-product.module.js.map
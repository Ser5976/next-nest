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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const category_product_model_1 = require("./../category-product/category-product.model");
const product_type_model_1 = require("./../product-type/product-type.model");
const brand_model_1 = require("./../brand/brand.model");
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class Rating {
}
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Rating.prototype, "estimation", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Rating.prototype, "numberRatings", void 0);
class Characteristic {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Characteristic.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Characteristic.prototype, "property", void 0);
let ProductModel = class ProductModel extends defaultClasses_1.TimeStamps {
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ProductModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ProductModel.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Characteristic }),
    __metadata("design:type", Array)
], ProductModel.prototype, "characteristic", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Rating, _id: false, default: {} }),
    __metadata("design:type", Rating)
], ProductModel.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], ProductModel.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], ProductModel.prototype, "oldPrice", void 0);
__decorate([
    (0, typegoose_1.prop)(String),
    __metadata("design:type", Array)
], ProductModel.prototype, "files", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => brand_model_1.BrandModel }),
    __metadata("design:type", Object)
], ProductModel.prototype, "brandId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => product_type_model_1.ProductTypeModel }),
    __metadata("design:type", Object)
], ProductModel.prototype, "typeId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => category_product_model_1.CategoryProductModel }),
    __metadata("design:type", Object)
], ProductModel.prototype, "categoryId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], ProductModel.prototype, "coundOpened", void 0);
ProductModel = __decorate([
    (0, typegoose_1.index)({ '$**': 'text' })
], ProductModel);
exports.ProductModel = ProductModel;
//# sourceMappingURL=product.model.js.map
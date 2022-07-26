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
exports.ProductTypeModel = void 0;
const brand_model_1 = require("./../brand/brand.model");
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class ProductTypeModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], ProductTypeModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => brand_model_1.BrandModel }),
    __metadata("design:type", Object)
], ProductTypeModel.prototype, "brand", void 0);
exports.ProductTypeModel = ProductTypeModel;
//# sourceMappingURL=product-type.model.js.map
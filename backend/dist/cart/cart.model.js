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
exports.CartModel = void 0;
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../user/user.model");
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class CartModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.UserModel }),
    __metadata("design:type", Object)
], CartModel.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => product_model_1.ProductModel }),
    __metadata("design:type", Object)
], CartModel.prototype, "productId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CartModel.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], CartModel.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CartModel.prototype, "picture", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], CartModel.prototype, "oldPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], CartModel.prototype, "totalPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], CartModel.prototype, "totalOldPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 1 }),
    __metadata("design:type", Number)
], CartModel.prototype, "quantity", void 0);
exports.CartModel = CartModel;
//# sourceMappingURL=cart.model.js.map
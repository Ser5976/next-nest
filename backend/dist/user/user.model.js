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
exports.UserModel = void 0;
const reviews_model_1 = require("./../reviews/reviews.model");
const cart_model_1 = require("./../cart/cart.model");
const product_model_1 = require("../product/product.model");
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
class Phone {
}
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Phone.prototype, "phone", void 0);
class PersonalData {
}
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], PersonalData.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], PersonalData.prototype, "gender", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], PersonalData.prototype, "birthday", void 0);
class Address {
}
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Address.prototype, "house", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Address.prototype, "flat", void 0);
class UserModel extends defaultClasses_1.TimeStamps {
}
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [], ref: () => cart_model_1.CartModel }),
    __metadata("design:type", Array)
], UserModel.prototype, "cart", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [], ref: () => reviews_model_1.ReviewsModel }),
    __metadata("design:type", Array)
], UserModel.prototype, "reviews", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], UserModel.prototype, "isAdmin", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [], ref: () => product_model_1.ProductModel }),
    __metadata("design:type", Array)
], UserModel.prototype, "favorites", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [], ref: () => product_model_1.ProductModel }),
    __metadata("design:type", Array)
], UserModel.prototype, "viewed", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Phone, _id: false, default: {} }),
    __metadata("design:type", Phone)
], UserModel.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => PersonalData, _id: false, default: {} }),
    __metadata("design:type", PersonalData)
], UserModel.prototype, "personalData", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Address, _id: false, default: {} }),
    __metadata("design:type", Address)
], UserModel.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], UserModel.prototype, "purchaseHistory", void 0);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map
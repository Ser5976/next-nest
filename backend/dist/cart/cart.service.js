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
exports.CartService = void 0;
const user_model_1 = require("../user/user.model");
const cart_model_1 = require("./cart.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const mongoose_1 = require("mongoose");
let CartService = class CartService {
    constructor(CartModel, UserModel) {
        this.CartModel = CartModel;
        this.UserModel = UserModel;
    }
    async addCart(userId, dto) {
        console.log('CartDto:', dto);
        const { productId } = dto;
        const product = await this.CartModel.findOne({ userId, productId }).exec();
        if (product) {
            const { _id, price, oldPrice, quantity } = product;
            const updateProduct = await this.CartModel.findByIdAndUpdate(_id, {
                quantity: quantity + 1,
                totalPrice: price * (quantity + 1),
                totalOldPrice: oldPrice ? oldPrice * (quantity + 1) : null,
            }).exec();
            if (!updateProduct)
                throw new common_1.NotFoundException('товар не добавлен');
        }
        else {
            const newProduct = await this.CartModel.create(dto.oldPrice
                ? Object.assign(Object.assign({}, dto), { userId, totalPrice: dto.price, totalOldPrice: dto.oldPrice }) : Object.assign(Object.assign({}, dto), { userId, totalPrice: dto.price }));
            if (!newProduct)
                throw new common_1.NotFoundException('товар не добавлен');
            const user = await this.UserModel.findById(userId).exec();
            const { cart } = user;
            cart.push(newProduct._id);
            await user.save();
        }
        return { message: 'Товар добавлен в корзину' };
    }
    async getCart(userId) {
        const cart = await this.CartModel.find({ userId });
        const count = cart.length;
        const totalPriceProduct = cart.reduce((acc, item) => {
            return acc + (item.totalPrice ? item.totalPrice : item.price);
        }, 0);
        return { cart, count, totalPriceProduct };
    }
    async removingProductCart(id, userId) {
        const remoteProduct = await this.CartModel.findByIdAndDelete(id);
        if (!remoteProduct)
            throw new common_1.NotFoundException('Товар не удалён из корзины');
        await this.UserModel.updateOne({ _id: userId }, { $pull: { cart: new mongoose_1.Types.ObjectId(id) } });
        return { message: 'Товар удалён из корзины' };
    }
    async reduceNumber(id) {
        const product = await this.CartModel.findById(id).exec();
        const { _id, price, oldPrice, quantity } = product;
        if (quantity > 1) {
            const updateProduct = await this.CartModel.findByIdAndUpdate(_id, {
                quantity: quantity - 1,
                totalPrice: price * (quantity - 1),
                totalOldPrice: oldPrice ? oldPrice * (quantity - 1) : null,
            }).exec();
            if (!updateProduct)
                throw new common_1.NotFoundException('изменение не произошло');
            return { message: 'изменение произошло' };
        }
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(cart_model_1.CartModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object, Object])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map
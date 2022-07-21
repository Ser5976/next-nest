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
exports.RatingService = void 0;
const product_model_1 = require("../product/product.model");
const rating_model_1 = require("./rating.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let RatingService = class RatingService {
    constructor(RatingModel, ProductModel) {
        this.RatingModel = RatingModel;
        this.ProductModel = ProductModel;
    }
    async setRating(userId, dto) {
        const { productId, value } = dto;
        const newRating = await this.RatingModel.findOneAndUpdate({ userId, productId }, { userId, productId, value }, { upsert: true, new: true, setDefaultsOnInsert: true }).exec();
        if (!newRating)
            throw new common_1.NotFoundException('ваша оценка не отправлена');
        const numberRatings = await this.RatingModel.find({
            productId,
        })
            .count()
            .exec();
        const avgRating = await this.RatingModel.aggregate()
            .group({ _id: productId, average: { $avg: '$value' } })
            .exec();
        if (!avgRating[0].average)
            throw new common_1.NotFoundException('рейтинг не рассчитан');
        const estimation = avgRating[0].average.toFixed(1);
        const ratingProduct = await this.ProductModel.findByIdAndUpdate(productId, {
            rating: { estimation, numberRatings },
        }).exec();
        if (!ratingProduct)
            throw new common_1.NotFoundException('рейтинг не изменён');
        return { message: 'рейтинг изменён' };
    }
};
RatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(rating_model_1.RatingModel)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(product_model_1.ProductModel)),
    __metadata("design:paramtypes", [Object, Object])
], RatingService);
exports.RatingService = RatingService;
//# sourceMappingURL=rating.service.js.map
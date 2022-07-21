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
exports.ReviewsService = void 0;
const reviews_model_1 = require("./reviews.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let ReviewsService = class ReviewsService {
    constructor(ReviewsModel) {
        this.ReviewsModel = ReviewsModel;
    }
    async create(id, dto) {
        const reveiw = this.ReviewsModel.create({
            userId: id,
            name: dto.name,
            productId: dto.productId,
            text: dto.text,
        });
        if (reveiw)
            return { message: 'Ваш отзыв принят' };
        throw new common_1.NotFoundException('Ваш отзыв не принят,попробуйте ещё раз');
    }
    async getUserReviews(id) {
        const reviews = await this.ReviewsModel.find({ userId: id }).sort({
            createdAt: 'desc',
        });
        if (reviews)
            return reviews;
        throw new common_1.NotFoundException('Отзывы не получены');
    }
    async getProductReviews(productId) {
        const reviews = await this.ReviewsModel.find({ productId }).sort({
            createdAt: 'desc',
        });
        if (reviews)
            return reviews;
        throw new common_1.NotFoundException('Отзывы не получены');
    }
    async updateReview(idReview, dto) {
        const newReview = await this.ReviewsModel.findByIdAndUpdate(idReview, dto, {
            new: true,
        }).exec();
        if (newReview)
            return { message: 'отзыв обновлён' };
        throw new common_1.NotFoundException('отзыв не обновлён');
    }
    async deleteReview(id) {
        const deletedReview = await this.ReviewsModel.findByIdAndDelete(id);
        if (deletedReview)
            return { message: 'отзыв удалён' };
        throw new common_1.NotFoundException('отзыв не удален');
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(reviews_model_1.ReviewsModel)),
    __metadata("design:paramtypes", [Object])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map
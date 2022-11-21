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
exports.ReviewsController = void 0;
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const update_review_dto_1 = require("./dto/update.review.dto");
const reviews_dto_1 = require("./dto/reviews.dto");
const reviews_service_1 = require("./reviews.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const user_decorator_1 = require("../user/decorators/user.decorator");
let ReviewsController = class ReviewsController {
    constructor(ReviewsService) {
        this.ReviewsService = ReviewsService;
    }
    async create(_id, dto) {
        return this.ReviewsService.create(_id, dto);
    }
    async getReviews(_id) {
        return this.ReviewsService.getUserReviews(_id);
    }
    async getProductReviews(productId) {
        return this.ReviewsService.getProductReviews(productId);
    }
    async updateReview(id, dto) {
        return this.ReviewsService.updateReview(id, dto);
    }
    async deleteRrview(id, _id) {
        return this.ReviewsService.deleteReview(id, _id);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reviews_dto_1.ReviewsDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('user-reviews'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Get)(':productId'),
    __param(0, (0, common_1.Param)('productId', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getProductReviews", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, user_decorator_1.User)('_id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "deleteRrview", null);
ReviewsController = __decorate([
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map
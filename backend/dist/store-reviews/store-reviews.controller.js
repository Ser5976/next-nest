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
exports.StoreReviewsController = void 0;
const response_dto_1 = require("./dto/response.dto");
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const store_reviews_dto_1 = require("./dto/store-reviews.dto");
const store_reviews_service_1 = require("./store-reviews.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
let StoreReviewsController = class StoreReviewsController {
    constructor(StoreReviewsService) {
        this.StoreReviewsService = StoreReviewsService;
    }
    async createNews(dto) {
        return this.StoreReviewsService.createStoreReveiws(dto);
    }
    async getAllNews() {
        return this.StoreReviewsService.getStoreReviews();
    }
    async responseReviews(id, dto) {
        return this.StoreReviewsService.responseReview(id, dto);
    }
    async deleteNews(id) {
        return this.StoreReviewsService.deleteNews(id);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_reviews_dto_1.StoreReviewsDto]),
    __metadata("design:returntype", Promise)
], StoreReviewsController.prototype, "createNews", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StoreReviewsController.prototype, "getAllNews", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, response_dto_1.ResponseDto]),
    __metadata("design:returntype", Promise)
], StoreReviewsController.prototype, "responseReviews", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreReviewsController.prototype, "deleteNews", null);
StoreReviewsController = __decorate([
    (0, common_1.Controller)('store-reviews'),
    __metadata("design:paramtypes", [store_reviews_service_1.StoreReviewsService])
], StoreReviewsController);
exports.StoreReviewsController = StoreReviewsController;
//# sourceMappingURL=store-reviews.controller.js.map
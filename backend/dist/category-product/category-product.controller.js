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
exports.CategoryProductController = void 0;
const category_product_dto_1 = require("./dto/category-product.dto");
const category_product_service_1 = require("./category-product.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const search_dto_1 = require("./dto/search.dto");
let CategoryProductController = class CategoryProductController {
    constructor(CategoryProductService) {
        this.CategoryProductService = CategoryProductService;
    }
    async createProductType(dto) {
        return this.CategoryProductService.createCategoryProduct(dto);
    }
    async getCategoryProduct(dto) {
        return this.CategoryProductService.getCategoryProduct(dto);
    }
    async removeCategoryProduct(id) {
        return this.CategoryProductService.removeCategoryProduct(id);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_product_dto_1.CategoryProductDto]),
    __metadata("design:returntype", Promise)
], CategoryProductController.prototype, "createProductType", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchDto]),
    __metadata("design:returntype", Promise)
], CategoryProductController.prototype, "getCategoryProduct", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryProductController.prototype, "removeCategoryProduct", null);
CategoryProductController = __decorate([
    (0, common_1.Controller)('category-product'),
    __metadata("design:paramtypes", [category_product_service_1.CategoryProductService])
], CategoryProductController);
exports.CategoryProductController = CategoryProductController;
//# sourceMappingURL=category-product.controller.js.map
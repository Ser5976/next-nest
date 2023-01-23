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
exports.ProductTypeController = void 0;
const product_type_dto_1 = require("./dto/product-type.dto");
const product_type_service_1 = require("./product-type.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const search_dto_1 = require("./dto/search.dto");
let ProductTypeController = class ProductTypeController {
    constructor(ProductTypeService) {
        this.ProductTypeService = ProductTypeService;
    }
    async createProductType(dto) {
        return this.ProductTypeService.createProductType(dto);
    }
    async getProductType(dto) {
        return this.ProductTypeService.getProductType(dto);
    }
    async removeProductType(id) {
        return this.ProductTypeService.removeProductType(id);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_type_dto_1.ProductTypeDto]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "createProductType", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchDto]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "getProductType", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "removeProductType", null);
ProductTypeController = __decorate([
    (0, common_1.Controller)('product-type'),
    __metadata("design:paramtypes", [product_type_service_1.ProductTypeService])
], ProductTypeController);
exports.ProductTypeController = ProductTypeController;
//# sourceMappingURL=product-type.controller.js.map
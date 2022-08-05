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
exports.ForCustomersController = void 0;
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const for_customers_dto_1 = require("./dto/for-customers.dto");
const for_customers_service_1 = require("./for-customers.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
let ForCustomersController = class ForCustomersController {
    constructor(ForCustomersService) {
        this.ForCustomersService = ForCustomersService;
    }
    async createNews(dto) {
        return this.ForCustomersService.createData(dto);
    }
    async getAllData() {
        return this.ForCustomersService.getAllData();
    }
    async getNews(id) {
        return this.ForCustomersService.getData(id);
    }
    async updateNews(id, dto) {
        return this.ForCustomersService.updateData(id, dto);
    }
    async deleteNews(id) {
        return this.ForCustomersService.deleteData(id);
    }
};
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Post)(),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [for_customers_dto_1.ForCustomersDto]),
    __metadata("design:returntype", Promise)
], ForCustomersController.prototype, "createNews", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ForCustomersController.prototype, "getAllData", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForCustomersController.prototype, "getNews", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Put)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, for_customers_dto_1.ForCustomersDto]),
    __metadata("design:returntype", Promise)
], ForCustomersController.prototype, "updateNews", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorators_1.Auth)('admin'),
    __param(0, (0, common_1.Param)('id', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ForCustomersController.prototype, "deleteNews", null);
ForCustomersController = __decorate([
    (0, common_1.Controller)('for-customers'),
    __metadata("design:paramtypes", [for_customers_service_1.ForCustomersService])
], ForCustomersController);
exports.ForCustomersController = ForCustomersController;
//# sourceMappingURL=for-customers.controller.js.map
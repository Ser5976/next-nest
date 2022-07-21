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
exports.ViewedController = void 0;
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const user_model_1 = require("../user/user.model");
const user_decorator_1 = require("./../user/decorators/user.decorator");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const viewed_service_1 = require("./viewed.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ViewedController = class ViewedController {
    constructor(ViewedService) {
        this.ViewedService = ViewedService;
    }
    async getViewed(_id) {
        return this.ViewedService.getViewed(_id);
    }
    async setViewed(user, productId) {
        return this.ViewedService.setViewed(user, productId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ViewedController.prototype, "getViewed", null);
__decorate([
    (0, common_1.Put)(),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('productId', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], ViewedController.prototype, "setViewed", null);
ViewedController = __decorate([
    (0, common_1.Controller)('viewed'),
    __metadata("design:paramtypes", [viewed_service_1.ViewedService])
], ViewedController);
exports.ViewedController = ViewedController;
//# sourceMappingURL=viewed.controller.js.map
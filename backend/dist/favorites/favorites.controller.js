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
exports.FavoritesController = void 0;
const id_validation_pipe_1 = require("./../pipes/id.validation.pipe");
const user_model_1 = require("../user/user.model");
const favorites_service_1 = require("./favorites.service");
const common_1 = require("@nestjs/common");
const auth_decorators_1 = require("../auth/decorators/auth.decorators");
const user_decorator_1 = require("../user/decorators/user.decorator");
const mongoose_1 = require("mongoose");
let FavoritesController = class FavoritesController {
    constructor(FavoritesService) {
        this.FavoritesService = FavoritesService;
    }
    async getFavorites(_id) {
        return this.FavoritesService.getFavorites(_id);
    }
    async setFavorites(user, productId) {
        return this.FavoritesService.setFavorites(user, productId);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Put)(),
    (0, auth_decorators_1.Auth)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)('productId', id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.UserModel, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], FavoritesController.prototype, "setFavorites", null);
FavoritesController = __decorate([
    (0, common_1.Controller)('favorites'),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
exports.FavoritesController = FavoritesController;
//# sourceMappingURL=favorites.controller.js.map
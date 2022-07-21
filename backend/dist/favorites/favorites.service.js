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
exports.FavoritesService = void 0;
const user_model_1 = require("../user/user.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let FavoritesService = class FavoritesService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async getFavorites(id) {
        const favorites = await this.UserModel.findById(id)
            .populate('favorites')
            .exec()
            .then((data) => data.favorites);
        if (favorites)
            return favorites;
        throw new common_1.NotFoundException('Список избранных продуктов не получен');
    }
    async setFavorites(user, productId) {
        const { _id, favorites } = user;
        const newFavorites = this.UserModel.findByIdAndUpdate(_id, {
            favorites: favorites.includes(productId)
                ? favorites.filter((id) => String(id) !== String(productId))
                : [...favorites, productId],
        }, { new: true });
        if (newFavorites)
            return newFavorites;
        throw new common_1.NotFoundException('Изменение не произошло');
    }
};
FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], FavoritesService);
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map
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
exports.ViewedService = void 0;
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_model_1 = require("../user/user.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let ViewedService = class ViewedService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async getViewed(id) {
        const viewed = await this.UserModel.findById(id)
            .populate('viewed')
            .sort({ createdAt: 'desc' })
            .exec()
            .then((data) => data.viewed);
        if (viewed)
            return viewed;
        throw new common_1.NotFoundException('Список просмотренных  продуктов не получен');
    }
    async setViewed(user, productId) {
        const { _id, viewed } = user;
        const newViewed = this.UserModel.findByIdAndUpdate(_id, {
            viewed: viewed.includes(new mongoose_1.Types.ObjectId(productId))
                ? viewed
                : [...viewed, productId],
        }, { new: true });
        if (newViewed)
            return newViewed;
        throw new common_1.NotFoundException('Изменение не произошло');
    }
};
ViewedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], ViewedService);
exports.ViewedService = ViewedService;
//# sourceMappingURL=viewed.service.js.map
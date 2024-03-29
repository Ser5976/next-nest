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
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async byId(id) {
        const user = await this.UserModel.findById(id)
            .populate('reviews favorites viewed')
            .select('-password -__v')
            .exec();
        if (user)
            return user;
        throw new common_1.NotFoundException('Такого пользователя не существует!');
    }
    async updateEmail(_id, updateEmailDto) {
        const user = await this.UserModel.findById(_id).exec();
        const isSameUser = await this.UserModel.findOne({
            email: updateEmailDto.email,
        });
        if (isSameUser && String(_id) !== String(isSameUser._id)) {
            throw new common_1.BadRequestException('Такой email существует ');
        }
        const validPassword = await (0, bcryptjs_1.compare)(updateEmailDto.password, user.password);
        if (!validPassword)
            throw new common_1.BadRequestException('Пароль неверный');
        user.email = updateEmailDto.email;
        await user.save();
        return { message: 'Изменение прошло успешно' };
    }
    async updatePassoword(_id, updatePasswordDto) {
        const user = await this.UserModel.findById(_id).exec();
        const validPassword = await (0, bcryptjs_1.compare)(updatePasswordDto.currentPassword, user.password);
        if (!validPassword)
            throw new common_1.BadRequestException('Пароль неверный');
        const salt = await (0, bcryptjs_1.genSalt)(7);
        user.password = await (0, bcryptjs_1.hash)(updatePasswordDto.password, salt);
        await user.save();
        return { message: 'Изменение прошло успешно' };
    }
    async getAllUsers(dto) {
        let options = {};
        if (dto.email) {
            options = {
                $or: [
                    {
                        email: new RegExp(dto.email, 'i'),
                    },
                ],
            };
        }
        const users = await this.UserModel.find(options)
            .select('-password -__v -favorites -viewed -cart -purchaseHistory -reviews')
            .sort({ createdAt: 'desc' })
            .exec();
        if (!users)
            throw new common_1.NotFoundException('Пользователи не получены');
        const quantity = await this.UserModel.find().count().exec();
        return { users, quantity };
    }
    async deleteUsers(id) {
        const deleteUser = await this.UserModel.findByIdAndDelete(id).exec();
        if (deleteUser)
            return { message: 'Пользователь удалён' };
        throw new common_1.NotFoundException('Такого пользователя не существует');
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
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
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("./user.model");
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async byId(id) {
        const user = await this.UserModel.findById(id)
            .populate('reviews favorites viewed')
            .exec();
        if (user)
            return user;
        throw new common_1.NotFoundException('Такого пользователя не существует!');
    }
    async updateProfileUser(_id, updateDto) {
        const user = await this.UserModel.findById(_id).exec();
        const isSameUser = await this.UserModel.findOne({ email: updateDto.email });
        if (isSameUser && String(_id) !== String(isSameUser._id)) {
            throw new common_1.NotFoundException('Такой email существует ');
        }
        if (user) {
            if (updateDto.password) {
                const salt = await (0, bcryptjs_1.genSalt)(7);
                user.password = await (0, bcryptjs_1.hash)(updateDto.password, salt);
            }
            user.email = updateDto.email;
            await user.save();
            return { message: 'Изменение прошло успешно' };
        }
        throw new common_1.NotFoundException('Такого пользователя нет');
    }
    async getAllUsers(searchUser) {
        let options = {};
        if (searchUser) {
            options = {
                $or: [{ email: new RegExp(searchUser, 'i') }],
            };
        }
        const users = await this.UserModel.find(options)
            .select('-password -__v')
            .sort({ createdAt: 'desc' })
            .exec();
        if (users)
            return users;
        throw new common_1.NotFoundException('Пользователи не получены');
    }
    async quantityUsers() {
        return this.UserModel.find().count().exec();
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
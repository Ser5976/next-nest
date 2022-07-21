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
exports.PersonalDataService = void 0;
const user_model_1 = require("../user/user.model");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const common_1 = require("@nestjs/common");
let PersonalDataService = class PersonalDataService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async updatePersonalData(id, dto) {
        const personalData = await this.UserModel.findByIdAndUpdate(id, {
            personalData: dto,
        });
        if (personalData)
            return { message: 'Редактирование прошло успешно' };
        throw new Error('Редактирование не вышло');
    }
    async updatePhoneNumber(id, dto) {
        const phone = await this.UserModel.findByIdAndUpdate(id, {
            phone: dto,
        });
        if (phone)
            return { message: 'Редактирование прошло успешно' };
        throw new Error('Редактирование не вышло');
    }
    async updateAddress(id, dto) {
        const address = await this.UserModel.findByIdAndUpdate(id, {
            address: dto,
        });
        if (address)
            return { message: 'Редактирование прошло успешно' };
        throw new Error('Редактирование не вышло');
    }
};
PersonalDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], PersonalDataService);
exports.PersonalDataService = PersonalDataService;
//# sourceMappingURL=personal-data.service.js.map